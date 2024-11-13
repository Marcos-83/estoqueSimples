
const mysql = require("mysql2/promise");
const express = require("express");
const pool = require("pool");
const app = express();

// Conectar ao banco de dados
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "estoque_simples"
});

// Middleware
app.use(express.json()); // Para fazer o parsing de JSON nas requisições
app.use(cors()); // Habilita CORS para permitir requisições do front-end

// Rota para listar produtos
app.get("/produtos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produtos WHERE deleted_at IS NULL");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao se conectar ao Banco", error: error });
  }
});

// Rota para criar um novo produto
app.post("/produtos", async (req, res) => {
  const { nome, descricao, preco, quantidade, categoria } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO produtos (nome, descricao, preco, quantidade, categoria, created_at, created_by) VALUES (?, ?, ?, ?, ?, NOW(), ?)",
      [nome, descricao, preco, quantidade, categoria, 1] // 1 representa o ID do usuário, substitua conforme necessário
    );

    res.status(201).json({ id: result.insertId, nome, descricao, preco, quantidade, categoria });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao inserir o produto", error: error });
  }
});

// Rota para atualizar um produto existente
app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade, categoria } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ?, updated_at = NOW() WHERE id = ?",
      [nome, descricao, preco, quantidade, categoria, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    res.json({ id, nome, descricao, preco, quantidade, categoria });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar o produto", error: error });
  }
});

// Rota para deletar um produto (soft delete)
app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "UPDATE produtos SET deleted_at = NOW(), deleted_by = ? WHERE id = ?",
      [1, id] // 1 representa o ID do usuário, substitua conforme necessário
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    res.json({ mensagem: "Produto deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar o produto", error: error });
  }
});

// Iniciar o servidor
app.listen(8000, () => {
  console.log("API rodando na porta 8000");
});

/* Explicação do Código:
POST /produtos: Cria um novo produto.
GET /produtos: Retorna todos os produtos não deletados (deleted_at IS NULL).
PUT /produtos/:id: Atualiza um produto pelo id.
DELETE /produtos/:id: Deleta um produto (soft delete, utilizando a coluna deleted_at).*/

// const mysql = require("mysql2/promise")
// const express = require("express")

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "estoque_simples"
// })

// const app = express()

// app.get("/produtos", async (req, res)=>{
//     try{
//         const [rows] = await pool.query("SELECT * FROM produtos")
//         res.json(rows)

//     } catch(meu_erro){
//         res.status(500).json({mensagem: "Erro ao se conectar ao Banco", error: meu_erro})

//     }
    
// })

// app.listen(8000, ()=>{
//     console.log("Minha API está funcionando!")

// })

