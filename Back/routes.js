const express = require('express');
const app = express();
const promisePool = require('./db'); // Importa o pool de conexões

// Configuração do Express
app.use(express.json());  // Para poder trabalhar com JSON nas requisições

// Exemplo de rota para obter todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    // Realiza uma consulta ao banco de dados usando o pool
    const [rows] = await promisePool.query('SELECT * FROM produtos');
    
    // Envia a resposta para o front-end
    res.json(rows);
  } catch (error) {
    console.error('Erro ao consultar banco de dados:', error);
    res.status(500).json({ message: 'Erro ao acessar banco de dados' });
  }
});

// Exemplo de rota para adicionar um produto
app.post('/produtos', async (req, res) => {
  const { nome, quantidade, preco } = req.body;
  try {
    // Insere um novo produto no banco de dados
    const result = await promisePool.query(
      'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
      [nome, quantidade, preco]
    );
    res.status(201).json({ message: 'Produto adicionado com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir produto:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto' });
  }
});

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
