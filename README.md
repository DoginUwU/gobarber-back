# Recuperação de senha

** Requisitos Funcionais **

- O usuário deve poder recuperar sua senha informando o seu email.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar sua senha.

** Requisitos Não Funcionais **

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar Amazon SES para envios em produção.
- O envio de e-mails devem acontecer em segundo plano (background job).

** Regras de Negócio **

- O link enviado por email para resetar senha, deve expirar em 2 horas.
- O usuário precisa confirmar a nova senha ao reseta-lá.

# Atualização do perfil

** Requisitos Funcionais **

- O usuário deve conseguir atualizar seu perfil (nome, email, senha).

** Regras de Negócio **

- O usuário não pode alterar seu email para um email já registrado.
- Para atualizar sua senha, o usuário deve informa sua senha antiga.
- Para atualizar sua senha, o usuário deve confirmar a sua nova senha.

# Painel do prestador

** Requisitos Funcionais **

- O usuário deve poder listar seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder visualizar as notificações não lidas.

** Requisitos Não Funcionais **

- Os agendamentos do prestador do dia devem ser amarzenados em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador devem ser enviadas em tempo real utilizando socket.io.

** Regras de Negócio **

- A notificação deve ter um status de lida ou não-lida para que o prestador possa se organizar.

# Agendamento de serviços

** Requisitos Funcionais **

- O usuário deve poder listar todos os prestadores de serviços cadastrados.
- O usuário deve poder listar os dias de um mês com horários disponíveis de um prestador expecífico.
- O usuário deve poder listar os horários disponíveis em um dia específico do prestador.
- O usuário deve poder realizar um novo agendamento com o prestador

** Requisitos Não Funcionais **

- A listagem de prestadores devem ser armazenada em cache.

** Regras de Negócio **

- Cada agendamento deve durar 1 hora exatamente.
- Os agendamento só podem estar disponíveis entre 8h AM até 18h
- O usuário não pode agendar em um horário já oculpado.
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços consigo mesmo.
