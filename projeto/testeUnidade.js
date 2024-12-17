const { Livro, Artigo, Revista, Deposito } = require("./classes");

const deposito = new Deposito();

/// criando
const livro1 = new Livro("Autor1", "Livro1", "01/01/2024", "10/01/2024", 300);
const artigo1 = new Artigo("Autor2", "Artigo1", "02/01/2024", "11/01/2024", "link.com");
const revista1 = new Revista("Autor3", "Revista1", "03/01/2024", "12/01/2024", 5);

deposito.addMaterial(livro1);
deposito.addMaterial(artigo1);
deposito.addMaterial(revista1);

console.assert(deposito.materiais.length === 3, "Falha: Não foi adicionados corretamente.");

// primeiro teste do projeto
livro1.alterarStatus("Lido");
console.assert(livro1.status === "Lido", "Falha: Status fornecido incorretamente.");

artigo1.alterarStatus("Em andamento");
console.assert(artigo1.status === "Em andamento", "Falha: Status fornecido incorretamente.");

// terceiro teste do projeto
livro1.adicionarResumo("Resumo sobre o Livro1.");
console.assert(livro1.resumos.length === 1, "Falha: Resumo inválido.");

revista1.adicionarResumo("Resumo sobre a Revista1.");
console.assert(revista1.resumos.length === 1, "Falha: Resumo inválido.");

artigo1.adicionarResumo("");
console.assert(artigo1.resumos.length === 0, "Falha: Resumo inválido.");

//  quarto teste do projeto
revista1.editarResumo(5, "Tentativa de edição inválida.");
console.assert(revista1.resumos.length === 1 && revista1.resumos[0].texto === "Resumo sobre a Revista1.","Falha: Edição com índice inválido alterou indevidamente os resumos.");
