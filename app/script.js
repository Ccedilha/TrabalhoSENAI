async function calculoGastos() {
    const categoriaGasto = document.getElementById("categoriaGasto").value;
    if (!categoriaGasto) {
        alert("Por favor, selecione uma categoria de gasto.");
        return;
    }
    const nome = document.getElementById("nomeGasto").value;
    if (!nome) {
        alert("Por favor, informe o nome do gasto.");
        return;
    }
    const valor = Number(document.getElementById("valorGasto").value);
    const moeda = document.getElementById("moeda").value;

    let valorEmReais = valor;
    if (moeda !== "BRL") {
        const resposta = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`);
        const dados = await resposta.json();
        valorEmReais = valor * dados[`${moeda}BRL`].bid;
    }

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push({ Categoria: categoriaGasto, Valor_Original: valor, gasto: nome, moeda, valorEmReais });
    localStorage.setItem("historico", JSON.stringify(historico));
}

async function exibirTotais() {
    if (!document.getElementById("totalReal")) return;

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    let totalReais = 0;
    for (let i = 0; i < historico.length; i++) {
        totalReais += historico[i].valorEmReais;
    }

    const resposta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL");
    const dados = await resposta.json();

    document.getElementById("totalReal").innerText = totalReais.toFixed(2);
    document.getElementById("totalDolar").innerText = (totalReais / dados.USDBRL.bid).toFixed(2);
    document.getElementById("totalEuro").innerText = (totalReais / dados.EURBRL.bid).toFixed(2);
    document.getElementById("totalBitcoin").innerText = (totalReais / dados.BTCBRL.bid).toFixed(8);
}

exibirTotais();