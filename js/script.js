//** Mensagem para quem usar o log */
setTimeout(function introConsole() {
    console.log("Olá, bem-vindo ao log, aqui você encontra os console.log que eu deixei por ai, se divirta nessa bagunça :D");
}, 0);

//** Declaração de variáveis e o método pra focar */

var info = document.getElementById("entrada");
var btnOnOff = document.getElementById("btn-On-Off");
var divBtnOnOff = document.getElementById("div-btn-on-off");
info.value = 0;
var calculado = false;

var estaLigado = false;
function focado() {
    var visor = document.getElementById("entrada");
    if (estaLigado == false) {
        estaLigado = true;
        visor.classList.add("visor-ligado");
        btnOnOff.innerText = "OFF";
        divBtnOnOff.classList.add("btn-off");
    } else {
        estaLigado = false;
        visor.classList.remove("visor-ligado");
        btnOnOff.innerText = "ON";
        divBtnOnOff.classList.remove("btn-off");
    }
}

//** valores permitios */

const numerosPermitidos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
const simbolosPermitidos = ['+', '-', '*', '/'];
//**Fim */

function apagar() {
    ligarCalc();

    var split = (info.value).split("");
    if (split[(split.length) - 2] == " ") {
        split.pop();
    }
    split.pop();
    info.value = split.join("");
    if ((info.value) == "") {
        info.value = 0;
    }
}

//** Métodos leitores */

var enterPressionado = false;
document.addEventListener('keydown', (event) => {
    const teclaPressionada = event.key;

    if (teclaPressionada == "Enter") {
        console.log("enter");
        enterPressionado = true;
        igual();
    }

    if (teclaPressionada == "Backspace") {
        var split = (info.value).split("");
        if (split[(split.length) - 2] == " ") {
            split.pop();
        }
        split.pop();
        info.value = split.join("");
        if ((info.value) == "") {
            info.value = 0;
        }
    }

    if (estaLigado == true && teclaPressionada != "Enter" ) {
        inserirValor(teclaPressionada);
    }
});

var visor = document.getElementById("entrada");
var isNumero;
function btnClick(valor) {
    if (enterPressionado == false) {
        ligarCalc();

        inserirValor(valor);
    }
    enterPressionado = false;
}

//** Parte de entrada e verificação dos valores e símbolos */

function inserirValor(v) {
    var find = false;
        
    if (calculado == true) {
        isNumero = false;
        for (var i = 0; i < numerosPermitidos.length; i++) {
            if (v == numerosPermitidos[i]) {
                isNumero = true;
            }
        }
        if (isNumero == true) {
            info.value = 0;
        }        
        calculado = false;
    }

    for (var i = 0; i < numerosPermitidos.length; i++) {
        if (v == numerosPermitidos[i]) {
            if (info.value === "0" && v != ".") {
                info.value = v;
            } else {
                info.value = (info.value + v);
            }
            find = true;
            break;
        }
    }

    if (find == false) {
        var split = (info.value).split("");
        var valorContemSimbolo = false;
        for (var i = 0; i < simbolosPermitidos.length; i++) {
            if (v == simbolosPermitidos[i]){
                valorContemSimbolo = true;
            }
        }

        if (valorContemSimbolo == true) {      
                
            var isRepetido = false;
            for (var i = 0; i <simbolosPermitidos.length; i++) {
                if (split[(split.length)-2] == simbolosPermitidos[i]) {             
                    isRepetido = true;
                }
            }

            if (isRepetido == true) {
                split.pop();
                split.pop();
                split.pop();
            }

            info.value = split.join("");
            info.value = info.value + " " + v + " ";
        }
    }
}

//** Botões */

function reset() {
    ligarCalc();
    info.value = 0;
    document.getElementById("past-entrada").innerHTML = "--";
}

function ligarCalc() {
    estaLigado = true;
    visor.classList.add("visor-ligado");
    btnOnOff.innerText = "OFF";
    divBtnOnOff.classList.add("btn-off");
}

function maisMenos() {
    var split = (info.value).split(" ");
    var ultimoNumero = parseFloat(split[(split.length)-1]);
    if ((Number.isFinite(ultimoNumero)) == true) {   
        split[(split.length)-1] = -1 * ultimoNumero;
    }
    info.value = split.join(" ");
}

//** Calcula */

var separado;
function igual() {
    ligarCalc();
    var lastIsSimbolo = false;
    separado = info.value.split(' ');
    
    if (separado[(separado.length)-1] == "") {
        lastIsSimbolo = true;
    }
    
    if (lastIsSimbolo == false && calculado == false) {
        document.getElementById("past-entrada").innerHTML = info.value + " = ";

        console.log("");
        console.log("---------------------------------");
        console.log("O que foi digitado:");
        console.log(info.value);  
        console.log("Vetor inicial:");
        console.log(separado)
        var res = 0;


        if (separado.length == 1) {
            res =  separado[0];
        } else {
            for (var i = 0; i < separado.length; i++) {
                if (separado[i] == '/') {
                    res = parseFloat(separado[i - 1]) / parseFloat(separado[i + 1]);
                    separado[i - 1] = res;

                    separado.splice(i, 2);
                    i = 0;
                }
            }

            console.log("Vetores pós divisão:");
            console.log(separado);
            console.log(res);

            for (var i = 0; i < separado.length; i++) {
                if (separado[i] == '*') {
                    res = parseFloat(separado[i - 1]) * parseFloat(separado[i + 1]);
                    separado[i - 1] = res;
                    separado.splice(i, 2);
                    i = 0;
                }
            }

            console.log("Vetores pós multiplicação:");
            console.log(separado);
            console.log(res);

            for (var i = 0; i < separado.length; i++) {
                if (separado[i] == '-') {
                    separado[i] = '+';
                    separado[i + 1] = -1 * parseFloat(separado[i + 1]);
                }
            }

            console.log("Transformado - para +");
            console.log(separado);

            for (var i = 0; i < separado.length; i++) {
                if (separado[i] == '+') {
                    res = parseFloat(separado[i - 1]) + parseFloat(separado[i + 1]);
                    separado[i - 1] = res;
                    separado.splice(i, 2);
                    i = 0;
                }
            }

            console.log("Vetores pós adição:");
            console.log(separado);
            console.log(res);
        }
        

        console.log('resultado final: ' + res);
        addHistorico(info.value, res);
        info.value = res;
        calculado = true;
        console.log(calculado);
        if (res == "Infinity") {
            document.getElementById("por-zero").classList.add("por-zero");
        }
    }
}

//** Adiciona o histórico */

function addHistorico(equacao, res) {
    console.log("oi");
    var calculo = document.createElement("p");
    var text = document.createTextNode(equacao +" = " + res);
    calculo.appendChild(text);
    var element = document.getElementById("cx-celulas");
    calculo.setAttribute("class", "celula");
    element.appendChild(calculo);
}

//* * Parte da calculadora E = mc2 */

var toggleVisibilidade = true;
function tgShowHide() {
    var calcEmc = document.getElementById("calc-emc");
    var containerCalcEmc = document.getElementById("container-calc-emc");
    if (toggleVisibilidade == true) {
        toggleVisibilidade = false;
        containerCalcEmc.classList.add("container-show");
        calcEmc.classList.add("calc-emc-show");
    } else {
        toggleVisibilidade = true;
        containerCalcEmc.classList.remove("container-show");
        calcEmc.classList.remove("calc-emc-show");       
    }
}

function calcEnergia(){
    var massa = document.getElementById("massa");
    console.log(parseFloat(massa.value));
    var calcEnegia = ((parseFloat(massa.value)) * Math.pow(299792458, 2)) / 1000000;
    var energia = document.getElementById("energia");
    console.log(calcEnegia);
    energia.value = calcEnegia.toLocaleString("pt-br");
}

function calcMassa(){
    var energia = document.getElementById("energia");
    console.log(parseFloat(energia.value));
    var calcMassa = ((parseFloat(energia.value)) / Math.pow(299792458, 2)) * 1000000;
    var massa = document.getElementById("massa");
    console.log(calcMassa);
    massa.value = calcMassa;
}


//*? Seção de avisos */

function entendi() {
    document.getElementById("avisos").style.display = "none";
}

function help() {
    document.getElementById("avisos").style.display = "block";
}