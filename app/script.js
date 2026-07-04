let moeda = document.getElementById("moeda").value;
let url = `https://economia.awesomeapi.com.br/last/${moeda}-BRL`
let gasto = document.getElementById("gastos").value;

const salvarGasto = []
function calculoGastos() {
    let valorGasto = document.getElementById("valorGasto").value;
    let moeda = document.getElementById("moeda").value;
    fetch(url)
        .then(function (resposta) {
            return resposta.json();
        })
    switch (moeda) {
        case "USD":
            calculoUSDBRL(moeda,valorGasto)
            break;
        case "BRL":
            console.log("teste")
        case "EUR":
            console.log("teste 2")
        case "BTC":
            console.log("teste 3")
    }


}


function calculoUSDBRL(moeda,valorGasto) {

    fetch(url)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            if (dados.erro) {
                alert("...")
                return;
            }
            let chaveMoeda = `${moeda}BRL`
            let cambio = dados[chaveMoeda]["bid"];
            let resultadoReais = Number(valorGasto) * Number(cambio)
            console.log(resultadoReais)
            console.log(document.getElementById("totalDolar"))
            document.getElementById("totalDolar").innerText = resultadoReais
            salvarHistorico("teste", resultadoReais)
        })
}

function salvarHistorico(nomeDoGasto, resultadoReais) {
    let novoSalvarGasto = {
        gasto: nomeDoGasto,
        valor: resultadoReais
    };
    salvarGasto.push(novoSalvarGasto);
    localStorage.setItem("historico", JSON.stringify(salvarGasto))

    console.log(salvarGasto);
}
// if (moeda === "BRL") {
//     const cambio = 1
//     let resultadoReais = Number(valorGasto) * Number(cambio)
//     console.log(resultadoReais)
//     return;
// }
// fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`)
//     .then(function (resposta) {
//         return resposta.json();
//     })
//     .then(function (dados) {
//         if (dados.erro) {
//             alert("...")
//             return;
//         }
//         const chaveMoeda = `${moeda}BRL`
//         let cambio = dados[chaveMoeda]["bid"];
//         let resultadoReais = Number(valorGasto) * Number(cambio)
//         console.log(resultadoReais)
//     })