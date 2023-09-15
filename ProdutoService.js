class ProdutoService {
    constructor() {}

    produtos = [
        { "id" : 1, "descricao" : "Curso C#", "estoque" : true},
        { "id" : 2, "descricao" : "Curso C++", "estoque" : false},
        { "id" : 3, "descricao" : "Curso Python", "estoque" : true},
        { "id" : 4, "descricao" : "Curso Java", "estoque" : false}
    ]

    getProdutos() {
        return this.produtos;
    }

    addProduto(produto) {
        this.produtos.push(produto)
    }

    alteraProduto(id, produto) {
        const objProduto = this.produtos.find(p => p.id == id)

        if (!objProduto) {
            return false
        }
        objProduto.descricao = produto.descricao

        return true
    }

    alteraEstoque(id, estoque) {
        const objProduto = this.produtos.find(p => p.id == id)

        if (!objProduto) {
            return false
        }
        objProduto.estoque = estoque

        return true
    }

    deletaProduto(id) {
        const tarefaIndex = this.produtos.findIndex(p => p.id == id)

        if(!tarefaIndex) {
            return false
        }

        this.produtos.splice(tarefaIndex, 1)

        return true
    }

}

module.exports = ProdutoService