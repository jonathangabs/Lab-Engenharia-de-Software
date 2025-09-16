function mostrarCampos() {
    const professor = document.getElementById("professor").checked;
    const aluno = document.getElementById("aluno").checked;

    document.getElementById("camposProfessor").style.display = professor ? "block" : "none";
    document.getElementById("camposAluno").style.display = aluno ? "block" : "none";
}

document.getElementById("dataNascimento").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    if (valor.length > 8) valor = valor.slice(0, 8);

    if (valor.length > 4) {
        this.value = valor.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (valor.length > 2) {
        this.value = valor.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    } else {
        this.value = valor;
    }
});

function formatarTelefone(campo, tipo) {
    let valor = campo.value.replace(/\D/g, "");

    if (tipo === "fixo") {
        if (valor.length > 10) valor = valor.slice(0, 10);
        if (valor.length > 6) {
            campo.value = `(${valor.slice(0, 2)})${valor.slice(2, 6)}-${valor.slice(6)}`;
        } else if (valor.length > 2) {
            campo.value = `(${valor.slice(0, 2)})${valor.slice(2)}`;
        } else {
            campo.value = valor;
        }
    } else if (tipo === "celular") {
        if (valor.length > 11) valor = valor.slice(0, 11);
        if (valor.length > 7) {
            campo.value = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
        } else if (valor.length > 2) {
            campo.value = `(${valor.slice(0, 2)})${valor.slice(2)}`;
        } else {
            campo.value = valor;
        }
    }
}

document.getElementById("telFixo").addEventListener("input", function () {
    formatarTelefone(this, "fixo");
});

document.getElementById("telCelular").addEventListener("input", function () {
    formatarTelefone(this, "celular");
});

function permitirSomenteNumeros(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
    }
}

document.getElementById("matriculaProfessor").addEventListener("keypress", permitirSomenteNumeros);
document.getElementById("matriculaAluno").addEventListener("keypress", permitirSomenteNumeros);

document.getElementById("matriculaProfessor").addEventListener("input", function () {
    this.value = this.value.slice(0, 5);
});
document.getElementById("matriculaAluno").addEventListener("input", function () {
    this.value = this.value.slice(0, 10);
});

document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let valido = true;

    function validarCampo(id, msg) {
        const campo = document.getElementById(id);
        const erro = document.getElementById("erro" + id.charAt(0).toUpperCase() + id.slice(1));

        if (!campo.value.trim()) {
            erro.textContent = msg;
            valido = false;
        } else {
            erro.textContent = "";
        }
    }

    validarCampo("nome", "Nome obrigatório");
    validarCampo("email", "Email obrigatório");
    validarCampo("dataNascimento", "Data obrigatória");
    validarCampo("telFixo", "Telefone fixo obrigatório");
    validarCampo("telCelular", "Telefone celular obrigatório");

    const perfil = document.querySelector('input[name="perfil"]:checked');
    if (!perfil) {
        alert("Selecione um perfil (Professor ou Aluno).");
        valido = false;
    } else {
        if (perfil.value === "professor") {
            validarCampo("area", "Área obrigatória");

            const matriculaProf = document.getElementById("matriculaProfessor").value;
            if (matriculaProf.length !== 5) {
                document.getElementById("erroMatriculaProfessor").textContent = "Matrícula deve ter 5 dígitos";
                valido = false;
            } else {
                document.getElementById("erroMatriculaProfessor").textContent = "";
            }

            validarCampo("lattes", "Lattes obrigatório");
        } else if (perfil.value === "aluno") {
            validarCampo("curso", "Curso obrigatório");

            const matriculaAluno = document.getElementById("matriculaAluno").value;
            if (matriculaAluno.length !== 10) {
                document.getElementById("erroMatriculaAluno").textContent = "Matrícula deve ter 10 dígitos";
                valido = false;
            } else {
                document.getElementById("erroMatriculaAluno").textContent = "";
            }
        }
    }

    if (valido) {
        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            telFixo: document.getElementById("telFixo").value,
            telCelular: document.getElementById("telCelular").value,
            perfil: perfil ? perfil.value : ""
        };

        if (perfil.value === "professor") {
            dados.area = document.getElementById("area").value;
            dados.matricula = document.getElementById("matriculaProfessor").value;
            dados.lattes = document.getElementById("lattes").value;
        } else if (perfil.value === "aluno") {
            dados.curso = document.getElementById("curso").value;
            dados.matricula = document.getElementById("matriculaAluno").value;
        }

        console.log("Dados do formulário:", dados);
        alert("Formulário enviado com sucesso!");
        this.reset();
        mostrarCampos();
    }
});