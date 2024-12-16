/* Explicação do Código:
POST /produtos: Cria um novo produto.
GET /produtos: Retorna todos os produtos não deletados (deleted_at IS NULL).
PUT /produtos/:id: Atualiza um produto pelo id.
DELETE /produtos/:id: Deleta um produto (soft delete, utilizando a coluna deleted_at).*/

const mysql = require("mysql2/promise")
const express = require("express")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "estoque_simples"
})

const app = express()

app.get("/produtos", async (req, res)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM produtos")
        res.json(rows)

    } catch(meu_erro){
        res.status(500).json({mensagem: "Erro ao se conectar ao Banco", error: meu_erro})

    }
    
})

app.listen(8000, ()=>{
    console.log("Minha API está funcionando!")

})

