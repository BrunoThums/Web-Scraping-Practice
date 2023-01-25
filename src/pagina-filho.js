/**
 * O que será extraído:
 * Título
 * Link da imagem
 * Data da Publicação
 * Texto
 */

const axios = require('axios');
const cheerio = require('cheerio');
const urlpai = 'https://www.gov.br/economia/pt-br/assuntos/noticias/2023/janeiro/mulheres-lideram-em-areas-estrategicas-no-mdic';
axios.get(urlpai)
.then(resp=>{
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);
    const titulo = $(".documentFirstHeading").text();
    const linkImagem = $("img").attr("src") == undefined ? "" : $("img").attr("src");
    const dataPublicação = $('span[class="value"]').text();
    const texto = $("div>p").text();
    const dados = []
    dados.push([titulo, linkImagem, dataPublicação, texto])
    console.log(dados);
}); 
