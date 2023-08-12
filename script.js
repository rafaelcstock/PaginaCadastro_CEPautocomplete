async function buscaCep (cep) {

    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "" ;

    try {
        var consultaCep = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertido = await consultaCep.json();
        
        if (consultaCepConvertido.erro) {
            throw Error('Cep não existente!');
        }

        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertido.localidade;
        logradouro.value = consultaCepConvertido.logradouro;
        estado.value = consultaCepConvertido.uf;
        bairro.value = consultaCepConvertido.bairro;

        console.log(consultaCepConvertido);
        return consultaCepConvertido;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido!</p>`;
        console.log(erro)
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaCep(cep.value));