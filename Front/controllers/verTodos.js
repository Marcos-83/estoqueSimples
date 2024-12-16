const container = document.querySelector("#container");

const estoque = JSON.parse(localStorage.getItem("banco_estoque")) || [];

estoque.forEach((produto) => {
    const novo_card = document.createElement("div");
    novo_card.className = "card";
    novo_card.innerHTML = `
     <h3>${produto.nome}</h3>
     <p>${produto.descricao}</p>
     <p><strong>Preço R$.</strong>${produto.preco} </p>
     <p><strong>Quantidade: </strong>${produto.quantidade}</p>
     <p><strong>Categoria: </strong>${produto.categoria}</p>
      `;
      container.appendChild(novo_card);
})