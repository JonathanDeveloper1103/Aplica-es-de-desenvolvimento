"""
Sistema de Agenda de Serviços
=============================

Aplicação de linha de comando para cadastrar clientes e serviços e
gerenciar agendamentos, com verificação de conflito de horário e
respeito ao horário de funcionamento.

Usa apenas a biblioteca padrão do Python (sqlite3 para persistência).

Execução:
    python agenda.py              # usa o banco "agenda.db"
    python agenda.py --db outro.db
"""

from __future__ import annotations

import argparse
import sqlite3
from dataclasses import dataclass
from datetime import date, datetime, time, timedelta

FORMATO_DATA = "%d/%m/%Y"
FORMATO_HORA = "%H:%M"
FORMATO_DATA_HORA = f"{FORMATO_DATA} {FORMATO_HORA}"

ABERTURA = time(8, 0)
FECHAMENTO = time(18, 0)
DIAS_UTEIS = {0, 1, 2, 3, 4, 5}  # segunda (0) a sábado (5)
INTERVALO_SLOTS_MIN = 30

STATUS_AGENDADO = "agendado"
STATUS_CONCLUIDO = "concluido"
STATUS_CANCELADO = "cancelado"


class AgendaErro(Exception):
    """Erro de regra de negócio da agenda."""


@dataclass
class Cliente:
    id: int
    nome: str
    telefone: str


@dataclass
class Servico:
    id: int
    nome: str
    duracao_min: int
    preco: float


@dataclass
class Agendamento:
    id: int
    cliente: str
    servico: str
    inicio: datetime
    fim: datetime
    status: str
    preco: float


class Agenda:
    """Regras de negócio e acesso ao banco de dados."""

    def __init__(self, caminho_db: str = "agenda.db") -> None:
        self.conn = sqlite3.connect(caminho_db)
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("PRAGMA foreign_keys = ON")
        self._criar_tabelas()

    def _criar_tabelas(self) -> None:
        self.conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS clientes (
                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                nome     TEXT NOT NULL,
                telefone TEXT NOT NULL UNIQUE
            );
            CREATE TABLE IF NOT EXISTS servicos (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                nome        TEXT NOT NULL UNIQUE,
                duracao_min INTEGER NOT NULL CHECK (duracao_min > 0),
                preco       REAL NOT NULL CHECK (preco >= 0)
            );
            CREATE TABLE IF NOT EXISTS agendamentos (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                cliente_id INTEGER NOT NULL REFERENCES clientes(id),
                servico_id INTEGER NOT NULL REFERENCES servicos(id),
                inicio     TEXT NOT NULL,
                fim        TEXT NOT NULL,
                status     TEXT NOT NULL DEFAULT 'agendado'
            );
            CREATE INDEX IF NOT EXISTS idx_agend_inicio ON agendamentos(inicio);
            """
        )
        self.conn.commit()

    def fechar(self) -> None:
        self.conn.close()

    # ----------------------------------------------------------- clientes
    def cadastrar_cliente(self, nome: str, telefone: str) -> Cliente:
        nome, telefone = nome.strip(), telefone.strip()
        if not nome or not telefone:
            raise AgendaErro("Nome e telefone são obrigatórios.")
        try:
            cur = self.conn.execute(
                "INSERT INTO clientes (nome, telefone) VALUES (?, ?)",
                (nome, telefone),
            )
        except sqlite3.IntegrityError:
            raise AgendaErro(f"Já existe cliente com o telefone {telefone}.")
        self.conn.commit()
        return Cliente(cur.lastrowid, nome, telefone)

    def listar_clientes(self) -> list[Cliente]:
        rows = self.conn.execute("SELECT * FROM clientes ORDER BY nome")
        return [Cliente(r["id"], r["nome"], r["telefone"]) for r in rows]

    # ----------------------------------------------------------- serviços
    def cadastrar_servico(self, nome: str, duracao_min: int, preco: float) -> Servico:
        nome = nome.strip()
        if not nome:
            raise AgendaErro("Nome do serviço é obrigatório.")
        if duracao_min <= 0:
            raise AgendaErro("A duração deve ser maior que zero.")
        if preco < 0:
            raise AgendaErro("O preço não pode ser negativo.")
        try:
            cur = self.conn.execute(
                "INSERT INTO servicos (nome, duracao_min, preco) VALUES (?, ?, ?)",
                (nome, duracao_min, preco),
            )
        except sqlite3.IntegrityError:
            raise AgendaErro(f"Já existe o serviço '{nome}'.")
        self.conn.commit()
        return Servico(cur.lastrowid, nome, duracao_min, preco)

    def listar_servicos(self) -> list[Servico]:
        rows = self.conn.execute("SELECT * FROM servicos ORDER BY nome")
        return [
            Servico(r["id"], r["nome"], r["duracao_min"], r["preco"]) for r in rows
        ]

    def _obter_servico(self, servico_id: int) -> Servico:
        r = self.conn.execute(
            "SELECT * FROM servicos WHERE id = ?", (servico_id,)
        ).fetchone()
        if r is None:
            raise AgendaErro(f"Serviço {servico_id} não encontrado.")
        return Servico(r["id"], r["nome"], r["duracao_min"], r["preco"])

    def _cliente_existe(self, cliente_id: int) -> bool:
        return (
            self.conn.execute(
                "SELECT 1 FROM clientes WHERE id = ?", (cliente_id,)
            ).fetchone()
            is not None
        )

    # ------------------------------------------------------- agendamentos
    @staticmethod
    def _validar_horario(inicio: datetime, fim: datetime) -> None:
        if inicio.weekday() not in DIAS_UTEIS:
            raise AgendaErro("Não há atendimento neste dia da semana.")
        if inicio.time() < ABERTURA or fim.time() > FECHAMENTO or fim.date() != inicio.date():
            raise AgendaErro(
                f"Horário fora do expediente "
                f"({ABERTURA:%H:%M} às {FECHAMENTO:%H:%M})."
            )

    def _tem_conflito(self, inicio: datetime, fim: datetime, ignorar_id: int | None = None) -> bool:
        # Dois intervalos se sobrepõem se: inicio_a < fim_b e inicio_b < fim_a
        sql = (
            "SELECT 1 FROM agendamentos "
            "WHERE status = ? AND inicio < ? AND fim > ?"
        )
        params: list = [STATUS_AGENDADO, fim.isoformat(), inicio.isoformat()]
        if ignorar_id is not None:
            sql += " AND id != ?"
            params.append(ignorar_id)
        return self.conn.execute(sql, params).fetchone() is not None

    def agendar(self, cliente_id: int, servico_id: int, inicio: datetime) -> Agendamento:
        if not self._cliente_existe(cliente_id):
            raise AgendaErro(f"Cliente {cliente_id} não encontrado.")
        servico = self._obter_servico(servico_id)
        if inicio < datetime.now():
            raise AgendaErro("Não é possível agendar no passado.")
        fim = inicio + timedelta(minutes=servico.duracao_min)
        self._validar_horario(inicio, fim)
        if self._tem_conflito(inicio, fim):
            raise AgendaErro("Já existe um agendamento neste horário.")

        cur = self.conn.execute(
            "INSERT INTO agendamentos (cliente_id, servico_id, inicio, fim, status) "
            "VALUES (?, ?, ?, ?, ?)",
            (cliente_id, servico_id, inicio.isoformat(), fim.isoformat(), STATUS_AGENDADO),
        )
        self.conn.commit()
        return self.obter_agendamento(cur.lastrowid)

    def obter_agendamento(self, agendamento_id: int) -> Agendamento:
        r = self.conn.execute(
            self._SQL_AGENDAMENTOS + " WHERE a.id = ?", (agendamento_id,)
        ).fetchone()
        if r is None:
            raise AgendaErro(f"Agendamento {agendamento_id} não encontrado.")
        return self._linha_para_agendamento(r)

    def remarcar(self, agendamento_id: int, novo_inicio: datetime) -> Agendamento:
        atual = self.obter_agendamento(agendamento_id)
        if atual.status != STATUS_AGENDADO:
            raise AgendaErro("Só é possível remarcar agendamentos ativos.")
        if novo_inicio < datetime.now():
            raise AgendaErro("Não é possível remarcar para o passado.")
        novo_fim = novo_inicio + (atual.fim - atual.inicio)
        self._validar_horario(novo_inicio, novo_fim)
        if self._tem_conflito(novo_inicio, novo_fim, ignorar_id=agendamento_id):
            raise AgendaErro("Já existe um agendamento neste horário.")
        self.conn.execute(
            "UPDATE agendamentos SET inicio = ?, fim = ? WHERE id = ?",
            (novo_inicio.isoformat(), novo_fim.isoformat(), agendamento_id),
        )
        self.conn.commit()
        return self.obter_agendamento(agendamento_id)

    def _mudar_status(self, agendamento_id: int, novo_status: str) -> Agendamento:
        atual = self.obter_agendamento(agendamento_id)
        if atual.status != STATUS_AGENDADO:
            raise AgendaErro(f"Agendamento já está '{atual.status}'.")
        self.conn.execute(
            "UPDATE agendamentos SET status = ? WHERE id = ?",
            (novo_status, agendamento_id),
        )
        self.conn.commit()
        return self.obter_agendamento(agendamento_id)

    def cancelar(self, agendamento_id: int) -> Agendamento:
        return self._mudar_status(agendamento_id, STATUS_CANCELADO)

    def concluir(self, agendamento_id: int) -> Agendamento:
        return self._mudar_status(agendamento_id, STATUS_CONCLUIDO)

    _SQL_AGENDAMENTOS = (
        "SELECT a.id, c.nome AS cliente, s.nome AS servico, s.preco, "
        "a.inicio, a.fim, a.status "
        "FROM agendamentos a "
        "JOIN clientes c ON c.id = a.cliente_id "
        "JOIN servicos s ON s.id = a.servico_id"
    )

    @staticmethod
    def _linha_para_agendamento(r: sqlite3.Row) -> Agendamento:
        return Agendamento(
            r["id"], r["cliente"], r["servico"],
            datetime.fromisoformat(r["inicio"]), datetime.fromisoformat(r["fim"]),
            r["status"], r["preco"],
        )

    def listar_do_dia(self, dia: date) -> list[Agendamento]:
        ini = datetime.combine(dia, time.min).isoformat()
        fim = datetime.combine(dia + timedelta(days=1), time.min).isoformat()
        rows = self.conn.execute(
            self._SQL_AGENDAMENTOS + " WHERE a.inicio >= ? AND a.inicio < ? ORDER BY a.inicio",
            (ini, fim),
        )
        return [self._linha_para_agendamento(r) for r in rows]

    def horarios_livres(self, dia: date, servico_id: int) -> list[time]:
        """Retorna os horários de início disponíveis para um serviço no dia."""
        servico = self._obter_servico(servico_id)
        if dia.weekday() not in DIAS_UTEIS:
            return []
        livres = []
        atual = datetime.combine(dia, ABERTURA)
        limite = datetime.combine(dia, FECHAMENTO)
        duracao = timedelta(minutes=servico.duracao_min)
        agora = datetime.now()
        while atual + duracao <= limite:
            if atual >= agora and not self._tem_conflito(atual, atual + duracao):
                livres.append(atual.time())
            atual += timedelta(minutes=INTERVALO_SLOTS_MIN)
        return livres

    def faturamento(self, inicio: date, fim: date) -> float:
        """Soma o valor dos serviços concluídos no período (inclusivo)."""
        r = self.conn.execute(
            "SELECT COALESCE(SUM(s.preco), 0) AS total "
            "FROM agendamentos a JOIN servicos s ON s.id = a.servico_id "
            "WHERE a.status = ? AND a.inicio >= ? AND a.inicio < ?",
            (
                STATUS_CONCLUIDO,
                datetime.combine(inicio, time.min).isoformat(),
                datetime.combine(fim + timedelta(days=1), time.min).isoformat(),
            ),
        ).fetchone()
        return float(r["total"])


# ===================================================================== CLI
def ler_texto(msg: str) -> str:
    return input(msg).strip()


def ler_int(msg: str) -> int:
    while True:
        try:
            return int(ler_texto(msg))
        except ValueError:
            print("  Digite um número inteiro.")


def ler_float(msg: str) -> float:
    while True:
        try:
            return float(ler_texto(msg).replace(",", "."))
        except ValueError:
            print("  Digite um número válido (ex.: 49,90).")


def ler_data(msg: str) -> date:
    while True:
        try:
            return datetime.strptime(ler_texto(msg), FORMATO_DATA).date()
        except ValueError:
            print("  Use o formato dd/mm/aaaa.")


def ler_data_hora(msg: str) -> datetime:
    while True:
        try:
            return datetime.strptime(ler_texto(msg), FORMATO_DATA_HORA)
        except ValueError:
            print("  Use o formato dd/mm/aaaa hh:mm.")


def moeda(valor: float) -> str:
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def mostrar_agendamento(a: Agendamento) -> None:
    print(
        f"  #{a.id:<4} {a.inicio:%d/%m/%Y %H:%M}-{a.fim:%H:%M}  "
        f"{a.cliente:<20} {a.servico:<20} {moeda(a.preco):>12}  [{a.status}]"
    )


def menu(agenda: Agenda) -> None:
    opcoes = {
        "1": "Cadastrar cliente",
        "2": "Listar clientes",
        "3": "Cadastrar serviço",
        "4": "Listar serviços",
        "5": "Novo agendamento",
        "6": "Ver agenda do dia",
        "7": "Horários livres",
        "8": "Remarcar agendamento",
        "9": "Cancelar agendamento",
        "10": "Concluir agendamento",
        "11": "Faturamento do período",
        "0": "Sair",
    }
    while True:
        print("\n===== AGENDA DE SERVIÇOS =====")
        for k, v in opcoes.items():
            print(f" {k:>2} - {v}")
        escolha = ler_texto("Opção: ")
        try:
            if escolha == "1":
                c = agenda.cadastrar_cliente(ler_texto("Nome: "), ler_texto("Telefone: "))
                print(f"Cliente #{c.id} cadastrado.")
            elif escolha == "2":
                clientes = agenda.listar_clientes()
                if not clientes:
                    print("Nenhum cliente cadastrado.")
                for c in clientes:
                    print(f"  #{c.id:<4} {c.nome:<25} {c.telefone}")
            elif escolha == "3":
                s = agenda.cadastrar_servico(
                    ler_texto("Nome do serviço: "),
                    ler_int("Duração (minutos): "),
                    ler_float("Preço: "),
                )
                print(f"Serviço #{s.id} cadastrado.")
            elif escolha == "4":
                servicos = agenda.listar_servicos()
                if not servicos:
                    print("Nenhum serviço cadastrado.")
                for s in servicos:
                    print(f"  #{s.id:<4} {s.nome:<25} {s.duracao_min:>4} min  {moeda(s.preco):>12}")
            elif escolha == "5":
                a = agenda.agendar(
                    ler_int("ID do cliente: "),
                    ler_int("ID do serviço: "),
                    ler_data_hora("Data e hora (dd/mm/aaaa hh:mm): "),
                )
                print("Agendamento criado:")
                mostrar_agendamento(a)
            elif escolha == "6":
                dia = ler_data("Data (dd/mm/aaaa): ")
                itens = agenda.listar_do_dia(dia)
                if not itens:
                    print("Nenhum agendamento neste dia.")
                for a in itens:
                    mostrar_agendamento(a)
            elif escolha == "7":
                dia = ler_data("Data (dd/mm/aaaa): ")
                livres = agenda.horarios_livres(dia, ler_int("ID do serviço: "))
                if livres:
                    print("  " + "  ".join(h.strftime(FORMATO_HORA) for h in livres))
                else:
                    print("Sem horários livres.")
            elif escolha == "8":
                a = agenda.remarcar(
                    ler_int("ID do agendamento: "),
                    ler_data_hora("Nova data e hora (dd/mm/aaaa hh:mm): "),
                )
                print("Agendamento remarcado:")
                mostrar_agendamento(a)
            elif escolha == "9":
                mostrar_agendamento(agenda.cancelar(ler_int("ID do agendamento: ")))
            elif escolha == "10":
                mostrar_agendamento(agenda.concluir(ler_int("ID do agendamento: ")))
            elif escolha == "11":
                ini = ler_data("Data inicial (dd/mm/aaaa): ")
                fim = ler_data("Data final (dd/mm/aaaa): ")
                print(f"Faturamento: {moeda(agenda.faturamento(ini, fim))}")
            elif escolha == "0":
                print("Até logo!")
                break
            else:
                print("Opção inválida.")
        except AgendaErro as e:
            print(f"Erro: {e}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Sistema de agenda de serviços")
    parser.add_argument("--db", default="agenda.db", help="arquivo do banco SQLite")
    args = parser.parse_args()
    agenda = Agenda(args.db)
    try:
        menu(agenda)
    except (KeyboardInterrupt, EOFError):
        print("\nAté logo!")
    finally:
        agenda.fechar()


if __name__ == "__main__":
    main()
