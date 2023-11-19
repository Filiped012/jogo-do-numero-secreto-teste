let listaDeNumeroEscolhido = [];
let numerolimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 5');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
   
    if (chute == numeroAleatorio) {
        exibirTextoNaTela('h1' , 'Acertou');
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa" 
        let mensagemTentativas = `Você descubriu o número secreto ${numeroAleatorio} com ${tentativas} ${palavraTentativas}`
        exibirTextoNaTela('p' , mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {   
        if (chute > numeroAleatorio) {
            exibirTextoNaTela('p' , 'o número secreto é menor');
        } else {
            exibirTextoNaTela('p' , 'o número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numerolimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroEscolhido.length

    if (quantidadeDeElementosNaLista == numerolimite) {
        listaDeNumeroEscolhido = [];
    }
    if (listaDeNumeroEscolhido.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroEscolhido.push(numeroEscolhido);
        console.log(listaDeNumeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}