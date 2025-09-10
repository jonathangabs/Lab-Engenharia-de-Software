function mostrarCampos() {
    const professor = document.getElementById("professor").checked;
    const aluno = document.getElementById("aluno").checked;

    document.getElementById("camposProfessor").style.display = professor ? "block" : "none";
    document.getElementById("camposAluno").style.display = aluno ? "block" : "none";
}

function validarCampo(campo) {
    const erroId = "erro" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1);
    const erroSpan = document.getElementById(erroId);

    if (!campo.value.trim()) {
        if (erroSpan) erroSpan.textContent = "Campo obrigatório";
        return false;
    } else {
        if (erroSpan) erroSpan.textContent = "";
        return true;
    }
}

function validarEmail(campo) {
    const erroEmail = document.getElementById("erroEmail");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(campo.value.trim())) {
        erroEmail.textContent = "Email inválido";
        return false;
    } else {
        erroEmail.textContent = "";
        return true;
    }
}

document.getElementById("cadastroForm").onsubmit = function(event) {
    event.preventDefault();

    const campos = document.querySelectorAll("#cadastroForm input[type=text], #cadastroForm input[type=email]");
    let todosValidos = true;

    campos.forEach(campo => {
        if (campo.offsetParent !== null) {
            if (campo.id === "email") {
                if (!validarEmail(campo)) todosValidos = false;
            } else {
                if (!validarCampo(campo)) todosValidos = false;
            }
        }
    });

    const radioSelecionado = document.querySelector('input[name="perfil"]:checked');
    if (!radioSelecionado) {
        alert("Selecione um perfil (Aluno ou Professor)");
        return;
    }
    const perfil = radioSelecionado.value;

    if (todosValidos) {
        let dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            telFixo: document.getElementById("telFixo").value,
            telCelular: document.getElementById("telCelular").value,
            perfil: perfil
        };

        if (perfil === "professor") {
            dados.area = document.getElementById("area").value;
            dados.matricula = document.getElementById("matriculaProfessor").value;
            dados.lattes = document.getElementById("lattes").value;
        } else {
            dados.curso = document.getElementById("curso").value;
            dados.matricula = document.getElementById("matriculaAluno").value;
        }

        console.log("Dados do formulário:", dados);
        alert("Formulário enviado com sucesso!");
        this.reset();
        mostrarCampos();
    }
};