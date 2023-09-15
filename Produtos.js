const mongoose = require("mongoose")


const  produtoSchema = new mongoose.Schema({
descricao : {
    type : String,
    required  : true
},
estoque :{
    type : Boolean,
    default : false
}


});

const Produto = mongoose. model("Produto",produtoSchema)

module.exports = Produto;
