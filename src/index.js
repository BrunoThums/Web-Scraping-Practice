const axios = require('axios');
const cheerio = require('cheerio');

const urlpai = 'https://www.gov.br/economia/pt-br/assuntos/noticias';

/**
 * Esta função extrairá os dados da página filho, recebendo como parâmetro o link
 * @param {*} link 
 */
function extraiDados(link){
    axios.get(link)
        .then(resp=>{
            const dadoshtml = resp.data;
            const $ = cheerio.load(dadoshtml);
            const titulo = $(".documentFirstHeading").text();
            const linkImagem = $("img").attr("src") ?? "";
            const dataPublicacao = $('span[class="value"]').text();
            const texto = $("div>p").text();
            const dados = {titulo, linkImagem, dataPublicacao, texto}
            console.log(dados);
        }); 
};

const links = 
    axios.get(urlpai)
    .then(resp=>{
        const dadoshtml = resp.data;
        const $ = cheerio.load(dadoshtml);
        const dados = []
        $('a[class="summary url"]').each((i,e)=>{ 
            const link = $(e).attr('href'); 
            //console.log(link)
            dados.push(link)
        }); 
        return dados;
    });

    async function main(){
        const linksMain = await links;
        linksMain.map((indice,elemento)=>{
            extraiDados(indice);
        });
    };

    main();
