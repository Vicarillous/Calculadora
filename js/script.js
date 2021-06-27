setTimeout(introConsole, 0);
function introConsole() {
    console.log("Olá, bem-vindo ao log, aqui você encontra os console.log que eu deixei por ai, se divirta nessa bagunça :D");
}

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

const numerosPermitidos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', ","];
const simbolosPermitidos = ['+', '-', '*', '/'];

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
            if (info.value == 0) {
                info.value = v;
            } else {
                info.value = (info.value + v);
            }
            find = true;
            break;
        }
    }

    if (find == false) {
        for (var i = 0; i < simbolosPermitidos.length; i++) {
            var split = (info.value).split("");
            var isSimbolo = false;

            for (var x = 0; x <simbolosPermitidos.length; x++) {
                if (split[(split.length)-2] == simbolosPermitidos[i]) {
                    isSimbolo = true;
                }
            }

            if (isSimbolo == true) {
                console.log("apaga");
                split.pop();
                split.pop();
                split.pop();
            }

            info.value = split.join(""); 

            if (v == simbolosPermitidos[i]) {
                info.value = info.value + " " + v + " ";
            }
        }
    }
}

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

var separado;
function igual() {
    ligarCalc();  

    document.getElementById("past-entrada").innerHTML = info.value + " = ";

    console.log("");
    console.log("---------------------------------");
    console.log("O que foi digitado:");
    console.log(info.value);
    separado = info.value.split(' ');
    console.log("Vetor inicial:");
    console.log(separado)
    var soma = 0, multiplicacao = 0, res = 0;


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
    

    console.log('resultado final: ' + res);
    info.value = res;
    calculado = true;
    console.log(calculado);
}

/*function tgShowHide(toggleVisibilidade) {
    var calcEmc = document.getElementById("calc-emc");
    var menu = document.getElementById("btn-menu");
    var calcBody =document.getElementById("calc-body");
    if (toggleVisibilidade == false) {
        toggleVisibilidade = true;

        calcEmc.classList.remove("move");
        menu.classList.add("hide");
        calcBody.classList.add("move-calc");
        setTimeout (function(){
            calcEmc.style.zIndex = "1";
        }, 1000)

    } else {

        toggleVisibilidade = false;
        calcEmc.style.zIndex = "-1";
        calcEmc.classList.add("move");       
        
        setTimeout (function(){
            menu.classList.remove("hide");
        }, 800)
        calcBody.classList.remove("move-calc");

    }
}



function calcEnergia(){
    var massa = document.getElementById("massa");
    console.log(parseFloat(massa.value));
    var calcEnegia = (parseFloat(massa.value)) * Math.pow(299792458, 2);
    var energia = document.getElementById("energia");
    console.log(calcEnegia);
    energia.value = calcEnegia;
}*/