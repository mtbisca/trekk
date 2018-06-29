# trekk
MC426 discipline project. (Unicamp, Engenharia de Software)

## pré-requisitos:
- Java 8
- Postgres 10

## Como rodar o servidor Backend:
1. É necessário configurar uma conexão com o Postgres
2. Criar um banco com o nome trekk
3. As tabelas serão criadas automaticamente ao rodar o arquivo main chamado TrekkApplication
4. Importe o projeto como um projeto maven pelo intellij
5. O Intellij atualiza as dependências do projeto automaticamente ao rodar a main
6. Antes de rodar a main do Intellij configure o arquivo application.properties na pasta resources
7. Está configurado na porta padrão, com username e senha postgres
8. Após configurado o banco basta rodar o arquivo main chamado TrekkApplication 
9. O servidor está configurado na porta 8000 para não entrar em conflito com o servidor frontend

## Como rodar o servidor Frontend:
1. Instalar o liveserver utilizando o Node.js
2. basta rodar liveserver na pasta onde está o frontend
