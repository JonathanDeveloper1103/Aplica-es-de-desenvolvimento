# Agenda de Serviços (Python)

Sistema de linha de comando para agendamento de serviços, usando só a biblioteca padrão (SQLite).

## Funcionalidades
- Cadastro e listagem de clientes e serviços (com duração e preço)
- Agendamentos com bloqueio de conflito de horário
- Respeito ao horário de funcionamento (seg–sáb, 08:00–18:00, configurável em `agenda.py`)
- Consulta de horários livres por serviço
- Remarcar, cancelar e concluir agendamentos
- Faturamento dos serviços concluídos por período

## Uso
```bash
python agenda.py            # cria/usa agenda.db
python agenda.py --db minha_agenda.db
```

## Testes
```bash
python -m unittest -v test_agenda
```
