function VerificarPalindromo() {
    let texto = document.getElementById("texto").value;

    let formatado = texto.LowerCase().replace(/[^a-z0-9]/g, '')
    let invertido = formatado.split('').reverse().join('');

    if (formatado === invertido) {
        alert("Não é um palíndromo");
    } else {
        alert("Não é um palíndromo");
    }
}

VerificarPalindromo();