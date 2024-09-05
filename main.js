

let Moeda = document.getElementById('MoedaSelecionada')
let MoedaConvertida = document.getElementById('MoedaConvertida')

let MoedaDIV = document.getElementById("Moeda")
let MoedaExpandidaDIV = document.getElementById("MoedaExpandida")

let ConvertDIV = document.getElementById("Convert")
let ConvertExpandidaDIV = document.getElementById("ConvertExpandida")

function VerificarEnter(pressionou, input) {
    if (pressionou.keyCode === 13) {
        Dados(input)
    }
}

function ExpandirMoedasSelecionadas(){
    if  (MoedaExpandidaDIV.style.display === 'none'){
        MoedaExpandidaDIV.style.display = 'flex';
        MoedaExpandidaDIV.style.flexDirection = 'column'

    } else {
        MoedaExpandidaDIV.style.display = 'none';
    }
    
}

function ExpandirMoedasConvertidas(){
    if  (ConvertExpandidaDIV.style.display === 'none'){
        ConvertExpandidaDIV.style.display = 'flex';
        ConvertExpandidaDIV.style.flexDirection = 'column'

    } else {
        ConvertExpandidaDIV.style.display = 'none';
    }
    
}

function MudarMoeda(valor){
    Moeda.textContent = valor
    document.querySelector('.ValorTransformar').placeholder = valor
}

function MudarConvert(valor){
    MoedaConvertida.textContent = valor
    document.querySelector('.ValorTransformar2').placeholder = valor
}

async function Dados(input){
    console.log(Moeda.textContent)
    console.log(MoedaConvertida.textContent)

    let Valor = NaN

    if (input == '1') {
        Valor = await fetch(`https://economia.awesomeapi.com.br/json/last/${Moeda.textContent}-${MoedaConvertida.textContent}`).then(Response => Response.json())
    } else{
        Valor = await fetch(`https://economia.awesomeapi.com.br/json/last/${MoedaConvertida.textContent}-${Moeda.textContent}`).then(Response => Response.json())
    }
    
    
    console.log(Valor)
    ExibirDados(Valor, input)
        
}

function ExibirDados(valor, input){

    let dadosMaior = NaN
    let dadosMenor = NaN

    if (input == '1') {
        dadosMaior = parseFloat(valor[`${Moeda.textContent}${MoedaConvertida.textContent}`].high);
        dadosMenor = parseFloat(valor[`${Moeda.textContent}${MoedaConvertida.textContent}`].low);
    } else{
        dadosMaior = parseFloat(valor[`${MoedaConvertida.textContent}${Moeda.textContent}`].high);
        dadosMenor = parseFloat(valor[`${MoedaConvertida.textContent}${Moeda.textContent}`].low);
    }
    
    dadosMedia = parseFloat((dadosMaior + dadosMenor) / 2);
    console.log(dadosMedia);

    if (input == '1') {
        let input1 = document.querySelector('.ValorTransformar').value
        document.querySelector('.ValorTransformar2').value = dadosMedia * input1
    } else{
        let input2 = document.querySelector('.ValorTransformar2').value
        document.querySelector('.ValorTransformar').value = dadosMedia * input2
    }
}


