// SECRET = "ENGPRO25"



// const express = require("express")


//  const server  =  express()
 
//  const jwt = require("jsonwebtoken")
//  const TarefasService = require("./TarefasService.ts")

// const tarefasService = new  TarefasService()

// server.use(express.json())


// server. post("/login",(req, res, next) =>{
//    if(req.body.usuario ==="ENGPRO25" && req.body.senha ==="25"){
//       //id do usuario  logado
//       const id = 1;

//       const token = jwt.sign({ id } ,SECRET, {
//          expiresIn: 300 /// EXPEIRA EM 5  MINUTOS

//       })

//       return res.json({ auth :true, tokem:  tokem})
//    }

//    return res.status(500).json({mensagem: "usuario ou senha incorreto"})
// })

// server.get("/tarefas", (req, res) =>{
//    tarefas = tarefasService.getTarefas();
   
// })
// server.listen(3001, ()=>{
//    console.log("Rodando Servidor")
// })
SECRET = "ENGPRO25"
const jwt = require("jsonwebtoken")

const express = require("express")
const server = express()

const Database = require("./Database.js")

const Produtos = require("./Produtos.js")//buscando inoformação de importação

const ProdutosService = require("./ProdutoService.js")
const res = require("express/lib/response.js")
const Produto = require("./Produtos.js")
const produtosService = new ProdutosService()

server.use(express.json())

function verificaTokenJWT(req, res, next){
   const token =req.headers['x-access-token'];

if(!token) return res.status(401).send("voce não tem permissão para ascessar")


jwt.verify(token, SECRET, function( err, decoded) { 
   if(err)return res.send("Houve algum erro na validação do token")

   req.usuarioId = decoded.id;
   next()
})

}

server.get("/", (req, res)=>{
   return res.send("bem vindo a api de produtod na nuvem")
})

server. post("/login",(req, res, next) =>{
   if(req.body.usuario ==="ENGPRO25" && req.body.senha ==="25"){
      //id do usuario  logado
      const id = 1;

      const token = jwt.sign({ id } ,SECRET, {
         expiresIn: 3600 /// EXPEIRA EM 5  MINUTOS

      })

      return res.json({ auth :true, token:  token}) // autentificação do token
   }

   return res.status(500).json({mensagem: "usuario ou senha incorreto"}) //retorno do usuario com senha incorreto
})

server.get("/tarefas", (req, res) =>{
   tarefas = tarefasService.getTarefas();
   
})
server.listen(3001, ()=>{
   console.log("Rodando Servidor")
})

server.get("/produtos", verificaTokenJWT,async (req, res) => { //busca as informações do banco

      try {
         const produtos =await Produtos.find()

         return  res.json(produtos)
      } catch (error) {
         return res. status(500).send(error) 
         
      }  
})

server.post("/produtos",verificaTokenJWT, async (req, res) => { //adicionar produtos na banco

const{ descricao,estoque } = req.body

try {
    const novoProduto = new Produto({
      descricao: descricao,
      estoque : estoque
    })

const produto = await novoProduto.save()

return res.json(produto)


} catch (error) {
   res.status(500). send(" ocorre um erro  ao add produto" +error)
   
}
})

server.put("/produtos/:id", async (req, res) => {   // editar informações
    id = req.params.id
    const{ descricao,estoque } = req.body

   try {
       const produto = await Produto.findByIdAndUpdate(
         id,
         {
            descricao: descricao,  
            estoque : estoque
         },
         {  new :true }
       )
       if(!produto) return res.status(500).send("Produto não encontrado")
       return  res.send("produto alterado com sucesso")


       //internament
       //select objeto from produto where id = id

       //update produto set objeto = objeto  where id = id


   } catch (error) {
      
   }

    
})

server.put("/alteraEstoque/:id", async (req, res) => {
    id = req.params.id
    try {
      const produto = await Produto.findByIdAndRemove(id)

      return res.send("Deletado com exelencia")
    } catch (error) {
      return res.status(500).send("Erro ao deletar")
      
    }
 
})

server.delete("/produtos/:id", (req, res) => {// deletar as  informações do banco
    id = req.params.id

    retorno = produtosService.deletaProduto(id)

    if(!retorno) return res.status(404).send("Houve algum problema no processo")

    return res.status(200).send("Tarefa deletada com sucesso")
})

// Servidor rodando




async function startServer(){

   try {
      await Database._connect() /// diz espera para execucar 
      server.listen(3000, () => {
         console.log("Servidor iniciado")
     })
   } catch (error) {
      console.error("Falha ao se conectra ao banco: "+error)
      
   }
}

startServer()
