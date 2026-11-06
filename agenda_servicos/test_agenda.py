import unittest
from datetime import datetime, timedelta, time

from agenda import Agenda, AgendaErro


def proxima_segunda(hora: int, minuto: int = 0) -> datetime:
    hoje = datetime.now().date()
    dias = (7 - hoje.weekday()) % 7 or 7
    return datetime.combine(hoje + timedelta(days=dias), time(hora, minuto))


class TestAgenda(unittest.TestCase):
    def setUp(self):
        self.agenda = Agenda(":memory:")
        self.cliente = self.agenda.cadastrar_cliente("Maria", "11999990000")
        self.corte = self.agenda.cadastrar_servico("Corte", 60, 50.0)

    def tearDown(self):
        self.agenda.fechar()

    def test_agendar_e_listar(self):
        inicio = proxima_segunda(9)
        a = self.agenda.agendar(self.cliente.id, self.corte.id, inicio)
        self.assertEqual(a.fim, inicio + timedelta(hours=1))
        self.assertEqual(len(self.agenda.listar_do_dia(inicio.date())), 1)

    def test_conflito(self):
        self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9))
        with self.assertRaises(AgendaErro):
            self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9, 30))
        # encostado no fim do anterior é permitido
        self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(10))

    def test_fora_do_expediente(self):
        with self.assertRaises(AgendaErro):
            self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(17, 30))
        with self.assertRaises(AgendaErro):
            self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(7))

    def test_domingo(self):
        domingo = proxima_segunda(9) - timedelta(days=1)
        with self.assertRaises(AgendaErro):
            self.agenda.agendar(self.cliente.id, self.corte.id, domingo)

    def test_cancelar_libera_horario(self):
        a = self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9))
        self.agenda.cancelar(a.id)
        self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9))

    def test_remarcar(self):
        a = self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9))
        b = self.agenda.remarcar(a.id, proxima_segunda(9, 30))
        self.assertEqual(b.inicio, proxima_segunda(9, 30))

    def test_horarios_livres(self):
        self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9))
        livres = self.agenda.horarios_livres(proxima_segunda(9).date(), self.corte.id)
        self.assertNotIn(time(9, 0), livres)
        self.assertNotIn(time(8, 30), livres)
        self.assertIn(time(8, 0), livres)
        self.assertIn(time(10, 0), livres)
        self.assertEqual(livres[-1], time(17, 0))

    def test_faturamento(self):
        a = self.agenda.agendar(self.cliente.id, self.corte.id, proxima_segunda(9))
        self.agenda.concluir(a.id)
        dia = a.inicio.date()
        self.assertEqual(self.agenda.faturamento(dia, dia), 50.0)

    def test_cliente_duplicado(self):
        with self.assertRaises(AgendaErro):
            self.agenda.cadastrar_cliente("Outra", "11999990000")


if __name__ == "__main__":
    unittest.main()
