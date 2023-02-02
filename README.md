# Web-Scraping-Practice
Este projeto introdutório tem como objetivo praticar os conhecimentos adquiridos sobre Web Scraping no curso Comunidade Web Automation (CWA), utilizando bibliotecas Javascript. Serão raspados as notícias da página `https://www.gov.br/economia/pt-br/assuntos/noticias` 
## Requisitos:
* Nvm: https://github.com/coreybutler/nvm-windows/releases, faça o download e execute o `nvm-setup.zip`.
* Node.js: abra o cmd, e digite `nvm install 10.16.2` e `nvm on` para habilidade o node. Use `nvm list` para se certificar que está instalado.
* Dependências: Instale-as no terminal do VSCode: `npm init -y ; axios cheerio mysql2 mongoose jsonfile env`.
* Configuração do banco MongoDB: 
* No site https://account.mongodb.com/account/login faça o seu login, crie um banco de dados chamado "blog" e resgate a url de acesso para substituí-la em `src mongodb/consulta.js` e `src mongodb/index.js`; lembrando de substituir no link o seu usuário e senha por `$usuario}` e `${senha}`.
* Na raiz do projeto crie um arquivo `.env` onde você colocará seus dados de usuário do mongoDB
** (linha 1) usuario = seuusuario
** (linha 2) senha = suasenha
* No MySQL Workbench, crie um banco de dados chamado "blog", e utilize o seguinte SQL:
* ```sql 
use blog;

#Criar a nossa tabela chamada noticias; 
create table `noticias` ( 
`id` int not null auto_increment, 
`titulo` varchar(200) not null, 
`linkimg` varchar(2048), 
`texto` TEXT,
primary key(`id`)
);

#Descrever a tabela
describe noticias;

SELECT * FROM noticias;

ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
flush privileges;```

Execute o código usando: `node src/index.js`
