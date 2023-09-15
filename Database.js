const mongoose = require("mongoose")


const server  = '127.0.0.1:27017'
const database = "Maisdados"

class Database {
   async _connect (){
        mongoose 
            .connect(`mongodb://${server}/${database}`)
            .then(()=>{
                console.log("Conectado no banco com sucesso")
            })
            .catch((error)=>{
                console.error("Ero ao conectar no banco" +error)
            })
    }
}
module.exports = new Database()