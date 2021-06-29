var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
var soma, subtracao, divisao, multiplicacao;

function calcular() {
    soma = parseFloat(num1.value) + parseFloat(num2.value);
    subtracao = num1.value - num2.value;
    divisao = num1.value / num2.value;
    multiplicacao = num1.value * num2.value;
    document.getElementById("resultado").innerHTML = "Soma: " + soma + "<br> Subtração: " + subtracao + "<br> Divisão: " + divisao + "<br> Multiplicação: " + multiplicacao;
}
