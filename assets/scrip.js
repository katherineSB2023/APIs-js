async function convertir() {
    let dataMoneda = await getRandomUser()
    let valoDolar = parseFloat(dataMoneda['dolar'].valor)
    let valoEuro = parseFloat(dataMoneda['euro'].valor)
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const monedaSeleccionada = document.getElementById('moneda').value;
    let total = 0;
    if (monedaSeleccionada == "USD") {
        total = cantidad / valoDolar
    } else {
        total = cantidad / valoEuro
    }
    resultado(total)
}

function resultado(total) {
    let resultado = document.getElementById("result");
    resultado.innerHTML = total;
}

async function getRandomUser() {
    let errorDiv = document.getElementById("error");
    try {
        const res = await fetch("https://mindicador.cl/api");
        const data = await res.json();
        return data
    } catch (error) {
        errorDiv.innerHTML = error.message;
    }
}

async function getAndCreateDataToChart(moneda) {
    const res = await
        fetch("https://www.mindicador.cl/api/" + moneda + "/2024");
    let datos = await res.json();
    const labels = datos["serie"].map((data) => {
        return new Date(data.Fecha);
    });

    const valores = datos["serie"].map((data) => {
        const valor = data.valor
        return Number(valor);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Moneda',
            data: valores,
            borderColor: 'rgb(75, 192, 192)',
        }]
    };

    return data
}

async function renderGrafica(moneda) {
    const data = await getAndCreateDataToChart(moneda);
    const config = {
        type: "line",
        data
    };
    const myChart = document.getElementById("myChart");
    myChart.style.backgroundColor = "white";

    new Chart(myChart, config);
}