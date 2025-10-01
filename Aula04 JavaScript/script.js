class Pessoa {
    constructor(nome, email, dataNascimento, telFixo, telCelular) {
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.telFixo = telFixo;
        this.telCelular = telCelular;
    }
}

class Aluno extends Pessoa {
    constructor(nome, email, dataNascimento, telFixo, telCelular, curso, matricula) {
        super(nome, email, dataNascimento, telFixo, telCelular);
        this.curso = curso;
        this.matricula = matricula;
    }
}

class Professor extends Pessoa {
    constructor(nome, email, dataNascimento, telFixo, telCelular, areaAtuacao, matricula, lattes) {
        super(nome, email, dataNascimento, telFixo, telCelular);
        this.areaAtuacao = areaAtuacao;
        this.matricula = matricula;
        this.lattes = lattes;
    }
}

const regex = {
    nome: /^[a-zA-Záàâãéèêíïóôõöúçñ\s]+ [a-zA-Záàâãéèêíïóôõöúçñ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    dataNascimento: /^\d{2}\/\d{2}\/\d{4}$/,
    telFixo: /^\(\d{2}\)\d{4}-\d{4}$/,
    telCelular: /^\(\d{2}\)\d{5}-\d{4}$/,
    matriculaAluno: /^\d{10}$/,
    matriculaProfessor: /^\d{5}$/,
    lattes: /^https?:\/\/.+/,
};


function aplicarMascaraTelefone(input, e) {
    const isCelular = input.id === 'telCelular';
    let value = input.value.replace(/\D/g, '');
    let mask = isCelular ? '(99)99999-9999' : '(99)9999-9999';

    if (e.inputType === 'deleteContentBackward') {
        input.value = value;
        return;
    }
    
    let formattedValue = '';
    let j = 0;
    for (let i = 0; i < mask.length && j < value.length; i++) {
        if (mask[i] === '9') {
            formattedValue += value[j];
            j++;
        } else {
            formattedValue += mask[i];
        }
    }

    input.value = formattedValue;
}


/**
@param {HTMLElement} input
@param {string} mensagem
 */
function exibirErro(input, mensagem) {
    const errorElement = document.getElementById('error-' + input.id);
    if (errorElement) {
        errorElement.textContent = mensagem;
    }
}

/**
@param {HTMLElement} input
@returns {boolean}
 */

function validarCampo(input) {
    const id = input.id;
    const value = input.value.trim();
    let mensagemErro = '';
    const perfil = document.querySelector('input[name="perfil"]:checked')?.value || 'Aluno';
    
    if (!value) {
        mensagemErro = 'Este campo é obrigatório.';
        exibirErro(input, mensagemErro);
        return false;
    }

    switch (id) {
        case 'nome':
            if (!regex.nome.test(value)) {
                mensagemErro = 'Formato inválido. Digite nome e sobrenome (Ex: João Silva).';
            }
            break;
        case 'email':
            if (!regex.email.test(value)) {
                mensagemErro = 'Email inválido. Siga o formato: xxx@xxx.xxx.';
            }
            break;
        case 'dataNascimento':
            if (!regex.dataNascimento.test(value)) {
                mensagemErro = 'Formato inválido. Siga o formato: dd/mm/aaaa.';
            }
            break;
        case 'telFixo':
            if (!regex.telFixo.test(value)) {
                mensagemErro = 'Formato inválido. Siga o padrão: (xx)xxxx-xxxx.';
            }
            break;
        case 'telCelular':
            if (!regex.telCelular.test(value)) {
                mensagemErro = 'Formato inválido. Siga o padrão: (xx)xxxxx-xxxx.';
            }
            break;

        case 'curso':
        case 'areaAtuacao':
        case 'lattes':
            if (id === 'lattes' && !regex.lattes.test(value)) {
                 mensagemErro = 'Link Lattes inválido. Deve ser uma URL completa (http/https).';
            }
            break;

        case 'matriculaAluno':
            if (perfil === 'Aluno' && !regex.matriculaAluno.test(value)) {
                mensagemErro = 'Matrícula de Aluno inválida. Requer 10 dígitos.';
            }
            break;
        case 'matriculaProfessor':
            if (perfil === 'Professor' && !regex.matriculaProfessor.test(value)) {
                mensagemErro = 'Matrícula de Professor inválida. Requer 5 dígitos.';
            }
            break;
    }

    exibirErro(input, mensagemErro);
    return mensagemErro === '';
}

/**
@returns {boolean}
 */

function validarFormularioCompleto() {
    let formValido = true;
    const form = document.getElementById('cadastroForm');
    const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"], input[type="url"]'));
    const perfilRadio = document.querySelector('input[name="perfil"]:checked');

    if (!perfilRadio) {
        document.getElementById('error-perfil').textContent = 'Selecione o perfil.';
        formValido = false;
    } else {
        document.getElementById('error-perfil').textContent = '';
    }

    inputs.forEach(input => {
        const isVisible = input.closest('.form-group-inline')?.style.display !== 'none' && input.closest('#campos-professor')?.style.display !== 'none';
        
        if (isVisible) {
            if (!validarCampo(input)) {
                formValido = false;
            }
        }
    });

    return formValido;
}

function alternarCamposPerfil() {
    const perfil = document.querySelector('input[name="perfil"]:checked')?.value;
    const camposAluno = document.getElementById('campos-aluno');
    const camposProfessor = document.getElementById('campos-professor');

    const inputs = document.querySelectorAll('#campos-aluno input, #campos-professor input');
    inputs.forEach(input => exibirErro(input, ''));

    if (perfil === 'Professor') {
        camposAluno.style.display = 'none';
        camposProfessor.style.display = 'block';
    } else { 
        camposAluno.style.display = 'block';
        camposProfessor.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const telFixoInput = document.getElementById('telFixo');
    const telCelularInput = document.getElementById('telCelular');

    alternarCamposPerfil();

    telFixoInput.addEventListener('input', (e) => aplicarMascaraTelefone(telFixoInput, e));
    telCelularInput.addEventListener('input', (e) => aplicarMascaraTelefone(telCelularInput, e));

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const resultadoDiv = document.getElementById('resultado-envio');
        resultadoDiv.textContent = ''; 

        if (validarFormularioCompleto()) {

            const dadosComuns = {
                nome: document.getElementById('nome').value.trim(),
                email: document.getElementById('email').value.trim(),
                dataNascimento: document.getElementById('dataNascimento').value.trim(),
                telFixo: document.getElementById('telFixo').value.trim(),
                telCelular: document.getElementById('telCelular').value.trim(),
            };

            const perfil = document.querySelector('input[name="perfil"]:checked').value;
            let objetoPessoa;

            if (perfil === 'Aluno') {
                objetoPessoa = new Aluno(
                    dadosComuns.nome,
                    dadosComuns.email,
                    dadosComuns.dataNascimento,
                    dadosComuns.telFixo,
                    dadosComuns.telCelular,
                    document.getElementById('curso').value.trim(),
                    document.getElementById('matriculaAluno').value.trim()
                );
            } else {
                objetoPessoa = new Professor(
                    dadosComuns.nome,
                    dadosComuns.email,
                    dadosComuns.dataNascimento,
                    dadosComuns.telFixo,
                    dadosComuns.telCelular,
                    document.getElementById('areaAtuacao').value.trim(),
                    document.getElementById('matriculaProfessor').value.trim(),
                    document.getElementById('lattes').value.trim()
                );
            }

            console.log('Objeto de Cadastro:', objetoPessoa);
            resultadoDiv.textContent = `Cadastro de ${perfil} realizado com sucesso! (Dados no console)`;
            resultadoDiv.classList.add('success-message');

        } else {
            resultadoDiv.textContent = 'Por favor, corrija os erros no formulário.';
            resultadoDiv.classList.remove('success-message');
            resultadoDiv.style.color = 'red';
        }
    });
});