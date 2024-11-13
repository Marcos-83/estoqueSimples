const formulario = document.querySelector("#formulario");
const nome_produto = document.querySelector("#nome_produto");
const descricao = document.querySelector("#descricao");
const preco = document.querySelector("#preco");
const quantidade = document.querySelector("#quantidade");
const categoria = document.querySelector("#categoria");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const novo_produto = {
    nome: nome_produto.value,
    descricao: descricao.value,
    preco: preco.value,
    quantidade: quantidade.value,
    categoria: categoria.value
  };

  try {
    const response = await fetch("http://localhost:8000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novo_produto)
    });

    const dados = await response.json();
    console.log("Produto cadastrado:", dados);

    if (response.ok) {
      formulario.reset();
      nome_produto.focus();
    } else {
      alert("Erro ao cadastrar produto!");
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
  }
});


// const formulario = document.querySelector("#formulario");
// const nome_produto = document.querySelector("#nome_produto");
// const descricao = document.querySelector("#descricao");
// const preco = document.querySelector("#preco");
// const quantidade = document.querySelector("#quantidade");
// const categoria = document.querySelector("#categoria");

// const estoque = JSON.parse(localStorage.getItem("banco_estoque")) || [];

// formulario.addEventListener("submit", (evento) => {
//     evento.preventDefault();

//     const novo_produto = {
//         nome: nome_produto.value,
//         descricao: descricao.value,
//         preco: preco.value,
//         quantidade: quantidade.value,
//         categoria: categoria.value,

//     };
//     estoque.push(novo_produto);
//     localStorage.setItem("banco_estoque", JSON.stringify(estoque));
//     console.log(estoque);
//     formulario.reset();
//     nome_produto.focus();

// });
