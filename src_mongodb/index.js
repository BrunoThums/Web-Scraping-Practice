const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const blog = require('./schemaDB');
const connection = require('./connection');

connection();


const salvarDados = (noticia) => {
    const novaNoticia = new blog({
        titulo:noticia.titulo,
        linkimg:noticia.linkImagem,
        data:noticia.dataPublicacao,
        texto:noticia.texto
    })
    blog.find({'titulo':noticia.titulo}, function(err,otitulo){
        if(err) throw(err);
        if(otitulo.length===0){
            novaNoticia.save();
        } else {
            console.log("Título já cadastrado!")
        }
    });
    
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
            salvarDados(noticia);
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
 * Fará o fechamento da conexão (do contrário teria que terminar a execução com ctrl+C) em 25ms
 */
setTimeout(()=>{
    mongoose.connection.close();
    console.log('Conexão finalizada!');
}, 25000);