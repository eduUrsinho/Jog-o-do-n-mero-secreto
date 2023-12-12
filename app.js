document.getElementById('botaoChutar').removeAttribute('disabled');
let listaDeNumeroSorteados = [];
let limiteDeNumerosAleatorios = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 0;

function exibirTextoHTML(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirTextoInicial() {
exibirTextoHTML('h1', 'Jogão do número secreto');
exibirTextoHTML('p', `Escolha um número de 1 a ${limiteDeNumerosAleatorios}.`);
}

exibirTextoInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;
    
    if(chute == numeroSecreto){
        exibirTextoHTML('h1', 'Acertou!');
        
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce descobriu o numere secrete com ${tentativas} ${palavraTentativa}!`;
        
        exibirTextoHTML('p', mensagemTentativas)

        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('botaoChutar').setAttribute('disabled',true);
    } else{
        if(chute > numeroSecreto){
            exibirTextoHTML('p', `O número secreto é menor que ${chute}.`);
        } else{
            exibirTextoHTML('p', `O número secreto é maior que ${chute}.`);
        }
        limparCampo();
    }
}

function gerarNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumerosAleatorios + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == limiteDeNumerosAleatorios){
        listaDeNumeroSorteados = [];
    }

    if(listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto();
    } else{
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    tentativas = 0;
    
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('botaoChutar').removeAttribute('disabled');
}