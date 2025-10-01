function AtualizarRelogio() {
    let agora = new Date();
    let horas = agora.getHours().toString().padStart(2, '0');
    let minutos = agora.getMinutes().toString().padStart(2, '0');
    let segundos = agora.getSeconds().toString().padStart(2, '0');

    let relogioFormatado = `${horas}:${minutos}:${segundos}`;

    document.getElementById("relogio").innerText = relogioFormatado;

    setTimeout(AtualizarRelogio, 1000);
}

AtualizarRelogio(); 