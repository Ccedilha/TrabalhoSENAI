const salvarGasto = []
function calculoGastos() {
    let gasto = document.getElementById("gastos").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let moeda = document.getElementById("moeda").value;

    if (moeda === "BRL") {
        const cambio = 1
        let resultadoReais = Number(valorGasto) * Number(cambio)
        console.log(resultadoReais)
        return;
    }
    fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            if (dados.erro) {
                alert("...")
                return;
            }
            const chaveMoeda = `${moeda}BRL`
            let cambio = dados[chaveMoeda]["bid"];
            let resultadoReais = Number(valorGasto) * Number(cambio)
            console.log(resultadoReais)
        })
}

function adicionaGasto() {

}