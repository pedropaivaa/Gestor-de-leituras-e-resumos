const prompt = require('prompt-sync')();
const { Livro, Artigo, Revista, Deposito } = require('./classes');


function exibirMenu(deposito) {
    let sair = false;

    while (!sair) {
        console.log("\nMenu de Operações:");
        console.log("1. Adicionar material");
        console.log("2. Listar materiais");
        console.log("3. Buscar material");
        console.log("4. Alterar status de material");
        console.log("5. Adicionar resumo a um material");
        console.log("6. Editar resumo de um material");
        console.log("7. Sair");

        const opcao = prompt("Escolha uma opção (1-7): ");

        if (opcao === '1') {
            const tipo = prompt("Digite o tipo de material (livro, revista, artigo): ").toLowerCase();
            const autor = prompt("Digite o autor: ");
            const titulo = prompt("Digite o título: ");
            const dataInicio = prompt("Digite a data de início: ");
            const dataFim = prompt("Digite a data de fim: ");

            let novoMaterial;
            if (tipo === 'livro') {
                const numeroPaginas = prompt("Digite o número de páginas: ");
                novoMaterial = new Livro(autor, titulo, dataInicio, dataFim, numeroPaginas);
            } else if (tipo === 'revista') {
                const numeroEdicoes = prompt("Digite o número de edições: ");
                novoMaterial = new Revista(autor, titulo, dataInicio, dataFim, numeroEdicoes);
            } else if (tipo === 'artigo') {
                const link = prompt("Digite o link do artigo: ");
                novoMaterial = new Artigo(autor, titulo, dataInicio, dataFim, link);
            } else {
                console.log("Tipo de material inválido! Tente novamente.");
                continue;
            }

            deposito.addMaterial(novoMaterial);
            console.log("Material adicionado com sucesso!");
        } else if (opcao === '2') {
            deposito.listarMateriais();
        } else if (opcao === '3') {
            const campoBusca = prompt("Buscar por (titulo, autor, tipoLeitura): ").toLowerCase();
            const valorBusca = prompt("Digite o valor correspondente ao campo escolhido: ");
            deposito.buscarMaterial(campoBusca, valorBusca);
        } else if (opcao === '4') {
            const tituloStatus = prompt("Digite o título do material: ");
            const materiaisEncontrados = deposito.buscarMaterial("titulo", tituloStatus);
        
            if (materiaisEncontrados.length > 0) {
                const material = materiaisEncontrados[0];
                const novoStatus = prompt("Digite o novo status: ");
                material.alterarStatus(novoStatus);
            } else {
                console.log("Material não encontrado.");
            }
        } else if (opcao === '5') {
            const tituloResumo = prompt("Digite o título do material: ");
            const materiaisEncontrados = deposito.buscarMaterial("titulo", tituloResumo);
        
            if (materiaisEncontrados.length > 0) {
                const material = materiaisEncontrados[0];
                const resumoTexto = prompt("Digite o resumo: ");
                material.adicionarResumo(resumoTexto);
            } else {
                console.log("Material não encontrado.");
            }
        } else if (opcao === '6') {
            const tituloResumo = prompt("Digite o título do material: ");
            const materiaisEncontrados = deposito.buscarMaterial("titulo", tituloResumo);
        
            if (materiaisEncontrados.length > 0) {
                const material = materiaisEncontrados[0];
        
                if (material.resumos.length > 0) {
                    console.log("Resumos existentes:");
                    for (let i = 0; i < material.resumos.length; i++) {
                        console.log(`${i}: ${material.resumos[i].texto}`);
                    }
        
                    const indice = parseInt(prompt("Digite o índice do resumo a ser editado: "));
                    const novoTexto = prompt("Digite o novo texto do resumo: ");
                    material.editarResumo(indice, novoTexto);
                } else {
                    console.log("O material não possui resumos.");
                }
            } else {
                console.log("Material não encontrado.");
            }
        } else if (opcao === '7') {
            console.log("Saindo do programa...");
            sair = true;
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    }
}

const deposito = new Deposito();
exibirMenu(deposito);