function MostrarData() {
    let data = new Date();

    let diasSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabádo"];
    let meses = ["janeiro", "fevereiro", "março", "abril", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

    let diaSemana = diasSemana[data.getDay()];
    let dia = data.getDate();
    let mes = meses[data.getMonth()];
    let ano = data.getFullYear();

    let dataFormatada = `${diaSemana}, ${dia}, ${mes}, ${ano}`;

    document.getElementById("data").innerText = dataFormatada;
}

MostrarData();