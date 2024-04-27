function adicionaDadosAluno() {
    const botaoAdicionarAluno = document.getElementById("adicionarAlunoBtn");
    const corpoTabelaAlunos = document.getElementById("alunoTableBody");

    // Função para salvar os dados no LocalStorage
    const salvarDadosLocalStorage = () => {
        const dadosAlunos = [];
        const linhasTabela = corpoTabelaAlunos.querySelectorAll("tr");

        linhasTabela.forEach(linha => {
            const inputs = linha.querySelectorAll("input");
            const dadosAluno = [];

            inputs.forEach(input => {
                dadosAluno.push(input.value);
            });

            dadosAlunos.push(dadosAluno);
        });

        localStorage.setItem("dadosAlunos", JSON.stringify(dadosAlunos));
    };

    // Função para preencher a tabela com os dados do LocalStorage, se houver
    const preencherTabelaLocalStorage = () => {
        const dadosArmazenados = localStorage.getItem("dadosAlunos");

        if (dadosArmazenados) {
            const dadosAlunos = JSON.parse(dadosArmazenados);

            dadosAlunos.forEach(dadosAluno => {
                const novaLinha = corpoTabelaAlunos.insertRow();
                dadosAluno.forEach((valor, indice) => {
                    const celula = novaLinha.insertCell();
                    const input = document.createElement("input");
                    input.type = "text";
                    input.value = valor;
                    input.setAttribute("data-indice", indice);
                    input.setAttribute("readonly", "true");
                    celula.appendChild(input);
                });

                const botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.addEventListener("click", function() {
                    const inputs = novaLinha.querySelectorAll("input");
                    inputs.forEach(input => {
                        input.removeAttribute("readonly");
                    });
                    botaoEditar.textContent = "Salvar";
                    botaoEditar.removeEventListener("click", arguments.callee);
                    botaoEditar.addEventListener("click", function() {
                        inputs.forEach(input => {
                            input.setAttribute("readonly", "true");
                        });
                        botaoEditar.textContent = "Editar";
                        salvarDadosLocalStorage(); // Salva os dados ao editar
                    });
                });

                const botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.addEventListener("click", function() {
                    corpoTabelaAlunos.removeChild(novaLinha);
                    salvarDadosLocalStorage(); // Salva os dados ao excluir
                });

                const celulaEditar = novaLinha.insertCell();
                celulaEditar.appendChild(botaoEditar);

                const celulaExcluir = novaLinha.insertCell();
                celulaExcluir.appendChild(botaoExcluir);
            });
        }
    };

    preencherTabelaLocalStorage(); // Preenche a tabela ao carregar a página

    botaoAdicionarAluno.addEventListener("click", function() {
        const camposEntrada = ["nome", "email", "ra", "prova_1", "aep_1", "prova_integrada_1", "prova_2", "aep_2", "prova_integrada_2"];
        const valores = camposEntrada.map(campo => {
            const elemento = document.getElementById(`input_${campo}`);
            return campo.startsWith("prova") ? parseFloat(elemento.value) : elemento.value;
        });

        const [nome, email, ra, prova1, aep1, provaIntegrada1, prova2, aep2, provaIntegrada2] = valores;

        const calcularMedia = (prova, aep, integrada) => Math.min(10, (prova * 0.8) + (aep * 0.1) + (integrada * 0.1));
        const mediaBimestre1 = calcularMedia(prova1, aep1, provaIntegrada1);
        const mediaBimestre2 = calcularMedia(prova2, aep2, provaIntegrada2);
        const mediaFinal = ((mediaBimestre1 + mediaBimestre2) / 2).toFixed(2);
        const statusAprovacao = mediaFinal >= 6 ? "Aprovado" : (mediaFinal >= 3 ? "Recuperação" : "Reprovado");

        const novaLinha = corpoTabelaAlunos.insertRow();
        novaLinha.setAttribute("data-nome", nome);

        const arrayValores = [...valores, mediaBimestre1, mediaBimestre2, mediaFinal, statusAprovacao];

        arrayValores.forEach((valor, indice) => {
            const celula = novaLinha.insertCell();
            const input = document.createElement("input");
            input.type = "text";
            input.value = valor;
            input.setAttribute("data-indice", indice);
            input.setAttribute("readonly", "true");
            celula.appendChild(input);
        });

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", function() {
            const inputs = novaLinha.querySelectorAll("input");
            inputs.forEach(input => {
                input.removeAttribute("readonly");
            });
            botaoEditar.textContent = "Salvar";
            botaoEditar.removeEventListener("click", arguments.callee);
            botaoEditar.addEventListener("click", function() {
                inputs.forEach(input => {
                    input.setAttribute("readonly", "true");
                });
                botaoEditar.textContent = "Editar";
                salvarDadosLocalStorage(); // Salva os dados ao editar
            });
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function() {
            corpoTabelaAlunos.removeChild(novaLinha);
            salvarDadosLocalStorage(); // Salva os dados ao excluir
        });

        const celulaEditar = novaLinha.insertCell();
        celulaEditar.appendChild(botaoEditar);

        const celulaExcluir = novaLinha.insertCell();
        celulaExcluir.appendChild(botaoExcluir);

        salvarDadosLocalStorage(); // Salva os dados ao adicionar um novo aluno
    });
}

document.addEventListener("DOMContentLoaded", adicionaDadosAluno);
