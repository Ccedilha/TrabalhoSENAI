const cambioPadrao = {
    USD: 5.00,
    EUR: 6.00,
    BTC: 350000.00
};

async function calculoGastos() {
    const nome = document.getElementById("exp-name").value;
    const valor = Number(document.getElementById("valorGasto").value);
    const moeda = document.getElementById("moeda").value;

    let valorEmReais = valor;

    if (moeda !== "BRL") {
        let cambio;
        try {
            const resposta = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`);
            const dados = await resposta.json();
            cambio = dados[`${moeda}BRL`].bid;
        } catch (erro) {
            cambio = cambioPadrao[moeda];
            alert("Não foi possível buscar a cotação atual. Usando taxa de câmbio padrão.");
        }
        valorEmReais = valor * cambio;
    }

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push({ gasto: nome, moeda, valorEmReais });
    localStorage.setItem("historico", JSON.stringify(historico));
}

async function exibirTotais() {
    if (!document.getElementById("totalReal")) return;

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    let totalReais = 0;
    for (const item of historico) {
        totalReais += item.valorEmReais;
    }

    let cotacaoUSD, cotacaoEUR, cotacaoBTC;
    try {
        const resposta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL");
        const dados = await resposta.json();
        cotacaoUSD = dados.USDBRL.bid;
        cotacaoEUR = dados.EURBRL.bid;
        cotacaoBTC = dados.BTCBRL.bid;
    } catch (erro) {
        cotacaoUSD = cambioPadrao.USD;
        cotacaoEUR = cambioPadrao.EUR;
        cotacaoBTC = cambioPadrao.BTC;
        alert("Não foi possível buscar as cotações atuais. Usando taxas de câmbio padrão.");
    }

    document.getElementById("totalReal").innerText = totalReais.toFixed(2);
    document.getElementById("totalDolar").innerText = (totalReais / cotacaoUSD).toFixed(2);
    document.getElementById("totalEuro").innerText = (totalReais / cotacaoEUR).toFixed(2);
    document.getElementById("totalBitcoin").innerText = (totalReais / cotacaoBTC).toFixed(8);
}

exibirTotais();