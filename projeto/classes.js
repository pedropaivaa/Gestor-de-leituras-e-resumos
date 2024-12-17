
class Resumo {
    constructor(texto) {
        this.texto = texto;
    }

    validacaoResumo() {
        return this.texto !== "";
    }
}
 
class Material {
    constructor(tipoLeitura, autor, titulo, dataInicio, dataFim) {
        this.tipoLeitura = tipoLeitura;  // se é livro, revista ou artigo
        this.autor = autor;  // nome do autor
        this.titulo = titulo;  // título do material
        this.dataInicio = dataInicio;  // data de início da leitura
        this.dataFim = dataFim;  // data de fim da leitura
        this.status = "Não Iniciado";  // status do material inicial
        this.resumos = [];  // guardar resumos para acessar depois
    }

    adicionarResumo(resumo) {
        const novoResumo = new Resumo(resumo);
        if (novoResumo.validacaoResumo()) {
            this.resumos.push(novoResumo);
            console.log("Resumo adicionado com sucesso :)");
        } else {
            console.log("O resumo não pode ser vazio");
        }
    }

    editarResumo(indice, novoTexto) {
        if (indice >= 0 && indice < this.resumos.length) {
            this.resumos[indice].texto = novoTexto;
            console.log("Resumo editado com sucesso :)");
        } else {
            console.log("Índice de resumo inválido.");
        }
    }

    alterarStatus(novoStatus) {
        this.status = novoStatus;
        console.log(`Status alterado para: ${this.status}`);
    }

    exibirInformacoes() {
        console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Tipo: ${this.tipoLeitura}, Status: ${this.status}`);
    }
}


class Livro extends Material {
    constructor(autor, titulo, dataInicio, dataFim, numeroPaginas) {
        super("livro", autor, titulo, dataInicio, dataFim);
        this.numeroPaginas = numeroPaginas;
    }

    exibirInformacoes() {
        super.exibirInformacoes();
        console.log(`Número de Páginas: ${this.numeroPaginas}`);
    }
}


class Artigo extends Material {
    constructor(autor, titulo, dataInicio, dataFim, link) {
        super("artigo", autor, titulo, dataInicio, dataFim);
        this.link = link;
    }

    exibirInformacoes() {
        super.exibirInformacoes();
        console.log(`Link: ${this.link}`);
    }
}


class Revista extends Material {
    constructor(autor, titulo, dataInicio, dataFim, numeroEdicoes) {
        super("revista", autor, titulo, dataInicio, dataFim);
        this.numeroEdicoes = numeroEdicoes;
    }

    exibirInformacoes() {
        super.exibirInformacoes();
        console.log(`Número de Edições: ${this.numeroEdicoes}`);
    }
}


class Deposito {
    constructor() {
        this.materiais = [];
    }

    addMaterial(material) {
        this.materiais.push(material);
    }

    listarMateriais() {
        console.log("Listagem de Materiais:");
        this.materiais.forEach(material => material.exibirInformacoes());
        return this.materiais;
    }

    buscarMaterial(campo, valor) {
        console.log(`Buscando materiais por ${campo}: ${valor}`);
        let materiaisEncontrados = [];

        for (let i = 0; i < this.materiais.length; i++) {
            let material = this.materiais[i];
            if (campo === "titulo" && this.compararStrings(material.titulo, valor)) {
                materiaisEncontrados.push(material);
            } else if (campo === "autor" && this.compararStrings(material.autor, valor)) {
                materiaisEncontrados.push(material);
            } else if (campo === "tipoLeitura" && this.compararStrings(material.tipoLeitura, valor)) {
                materiaisEncontrados.push(material);
            }
        }

        if (materiaisEncontrados.length > 0) {
            for (let i = 0; i < materiaisEncontrados.length; i++) {
                materiaisEncontrados[i].exibirInformacoes();
            }
        } else {
            console.log("Nenhum material encontrado.");
        }

        return materiaisEncontrados;
    }

    compararStrings(str1, str2) {
        return str1.toLowerCase() === str2.toLowerCase();
    }
}

module.exports = {Resumo, Material, Livro, Artigo, Revista, Deposito};