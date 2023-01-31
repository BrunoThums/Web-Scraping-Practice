const axios = require('axios');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');

const url = 'https://www.gov.br/economia/pt-br/assuntos/noticias';

//defina o local e o nome do arquivo
const file = './noticias.json';

function salvaJSON(dados){
    // A flag 'a' indica que é para continuar armazenando dados no json
    jsonfile.writeFile(file, dados, {flag:'a'})
    .then(res=>{
        console.log("Dados gravados!")
    })
    .catch(error => console.error(error))
};

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
            salvaJSON(noticia);
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