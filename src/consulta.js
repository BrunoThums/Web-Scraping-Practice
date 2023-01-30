const mysql = require('mysql');
const titulo = 'Roberto Pojo será titular da Secretaria de Gestão e Inovação';

const pool = mysql.createPool({
    //Quantidade de conexões simultâneas (entre o script e o MySQL)
    connectionLimit:10,
    //Onde está localizado o servidor do MySQL
    host:'localhost',
    //Usuário criado no MySQL (não o root)
    user:'admin',
    //Senha do usuário criado
    password:'123456',
    //Nome da base de dados
    database:'blog'
});

const consulta = (msg)=>{
    pool.getConnection (function(err, connection) {
    if (err) throw err;
    connection.query('select * from `noticias` where `titulo` = ?', msg, function (error, result, fields) {
        let countresult = result.length
        if (countresult===0){
            console.log('TITULO NÃO CADASTRADO!');
        }else{
            console.log('Titulo cadastrado!')
        }
        if (error) throw error;
        });
    })
}; 
consulta(titulo);