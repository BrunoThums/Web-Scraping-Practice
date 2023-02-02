const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql2');


const salvarDados = (dados) => {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("INSERT INTO noticias set ?", dados, function (error, result, fields) {
            connection.release();

            if (error) throw error;
        })
    })
}
//trata as conexões do script com a base de dados do MySQL
const pool = mysql.createPool({
    //Quantidade de conexões simultâneas (entre o script e o MySQL)
    connectionLimit: 15,
    //Onde está localizado o servidor do MySQL
    host: 'localhost',
    //Usuário criado no MySQL (não o root)
    user: 'admin',
    //Senha do usuário criado
    password: '123456',
    //Nome da base de dados
    database: 'blog'
});

/**
 * Fará a gravação dos dados da notícia no banco de dados
 * @param {*} noticia 
 */
function salvarMYSQL(noticia) {
    const dados = {
        titulo: noticia.titulo,
        linkimg: noticia.linkImagem,
        data: noticia.dataPublicacao,
        texto: noticia.texto
    }
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('select * from `noticias` where `titulo` = ?', dados.titulo, function (error, result, fields) {
            let countresult = result.length
            if (countresult === 0) {
                salvarDados(dados);
            } else {
                console.log('Titulo cadastrado!')
            }
            if (error) throw error;
        });
    })
}

const url = 'https://www.gov.br/economia/pt-br/assuntos/noticias';

/**
 * Esta função extrairá os dados da página filho, recebendo como parâmetro o link
 * @param {*} link 
 */
function extraiDados(link) {
    axios.get(link)
        .then(resp => {
            const dadoshtml = resp.data;
            const $ = cheerio.load(dadoshtml);
            const titulo = $(".documentFirstHeading").text() ?? "";
            const linkImagem = $("img").attr("src") ?? "";
            //é feito o tratamento imediato da data, pois a requisição traz duas datas: publicação e edição. Assim, pelo regex, só trará a de publicação
            const dataPublicacao = ($('span[class="value"]').text()).replace(/([\u{0}-\u{10FFFF}]{16}).*/u, '$1') ?? "";
            const texto = $("div>p").text() ?? "";
            const noticia = { titulo, linkImagem, dataPublicacao, texto }
            //console.log(dados);
            salvarMYSQL(noticia);
        });
};

const links =
    axios.get(url)
        .then(resp => {
            const dadoshtml = resp.data;
            const $ = cheerio.load(dadoshtml);
            const dados = []
            $('a[class="summary url"]').each((i, e) => {
                const link = $(e).attr('href');
                //console.log(link)
                dados.push(link)
            });
            return dados;
        });

async function main() {
    const linksMain = await links;
    linksMain.map((indice, elemento) => {
        extraiDados(indice);
    });
};

main();

/**
 * Fará o fechamento da pool (do contrário teria que terminar a execução com ctrl+C) em 25ms
 */
setTimeout(()=>{
    pool.end();
}, 25000)