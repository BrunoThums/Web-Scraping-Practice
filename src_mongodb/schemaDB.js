const mongoose = require('mongoose');
const blog = mongoose.model(
    'blog',
    mongoose.Schema({
        titulo: String,
        linkimg: String, 
        data: String, 
        texto: String
    })
);
module.exports = blog;