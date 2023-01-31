//Este arquivo é um teste para consultar se há ou não uma notícia no banco de dados, utilizando um título de exemplo
const mongoose = require("mongoose");
const blog = require('./schemaDB');

const frase = 'Decreto especifica estrutura do Ministério do Planejamento e Orçamento';

mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://BrunoThums:Brunobbt1%40@blog.jc7t09d.mongodb.net/?retryWrites=true&w=majority')
.then(result=>{
    console.log('Conexão estabelecida!')
})
.catch(error=>{
    console.log("Erro na conexão: "+error)
});

blog.find({'titulo':frase}, function(err,otitulo){
    if(err) throw(err);
    if(otitulo.length===0){
        console.log('Titulo não cadastrado')
    } else {
        console.log("Título cadastrado!")
    }
});

setTimeout(()=>{
    mongoose.connection.close();
    console.log('Conexão finalizada!');
}, 25000);