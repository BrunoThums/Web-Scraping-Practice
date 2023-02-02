const mongoose = require('mongoose');
function connection() {
    let usuario = process.env.NODE_USER
    let senha = process.env.NODE_PASS
    if (process.env.NODE_ENV !== 'producao') {
        require('dotenv').config();
        //Lembre-se de criar o arquivo ".env" e colocar o usuário e senha
        //NODE_USER = seuUsuario
        //NODE_PASS  = suaSenha
        usuario = process.env.NODE_USER
        senha = process.env.NODE_PASS
    } else {
        usuario = process.env.NODE_USER
        senha = process.env.NODE_PASS
    }


    //'mongodb+srv://BrunoThums:Brunobbt1%40@blog.jc7t09d.mongodb.net/?retryWrites=true&w=majority')
    mongoose.set("strictQuery", true);
    const URL = `mongodb+srv://${usuario}:${senha}@blog.jc7t09d.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(URL)

    const database = mongoose.connection;

    database.on('error', () => {
        console.error("Falha ao conectar-se com o banco!")
    });

    database.on('open', () => {
        console.log("Conectado com sucesso ao banco!")
    });
};

//connection(); 
module.exports = connection;