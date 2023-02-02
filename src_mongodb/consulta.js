//Este arquivo é um teste para consultar se há ou não uma notícia no banco de dados, utilizando um título de exemplo
const mongoose = require("mongoose");
const blog = require('./schemaDB');
const connection = require('./connection');

const frase = 'Decreto especifica estrutura do Ministério do Planejamento e Orçamento';
connection();

blog.find({ 'titulo': frase }, function (err, otitulo) {
    if (err) throw (err);
    if (otitulo.length === 0) {
        console.log('Titulo não cadastrado')
    } else {
        console.log("Título cadastrado!")
    }
});

setTimeout(() => {
    mongoose.connection.close();
    console.log('Conexão finalizada!');
}, 25000);