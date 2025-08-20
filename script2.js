function script2() {
    let numero = parseInt(prompt("Digite um número inteiro positivo:"));

    if (isNaN(numero) || numero <= 0) {
        alert("Número inválido. Tente novamente.");
        return;
    }

    let primo = true;
    if (numero === 1) {
        primo = false;
    } else {
        for (let i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i === 0) {
                primo = false;
                break;
            }
        }
    }

    if (primo) {
        alert("O número " + numero + " é PRIMO.");
    } else {
        alert("O número " + numero + " NÃO é primo.");
    }
}