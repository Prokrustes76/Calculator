let display = document.querySelector('.dislay'),
    keys = document.querySelector('.keys'),
    value = document.querySelector('.value'),
    operator = undefined,
    firstValue = undefined,
    justHitOperator = false


window.onload = ()=> {
    let key_content =     [7, 8, 9, 'DEL', 'AC',
                           4, 5, 6,  'x',  '÷',
                           1, 2, 3,  '+',  '-',
                           0, '.', '+/-',  '=']

    for (let k of key_content) {
        let el = document.createElement('kbd')
        el.innerText = k
        if (k == '=')
            el.style.width = '32%'
        el.addEventListener('click', clicked)
        el.setAttribute('class', 'flex center')
        keys.appendChild(el)
    }    
    window.addEventListener('keydown', clicked) 
}

function clicked(e) {
    let lastKey = e.key || e.target.innerHTML; 
    if (lastKey == 'DEL' || lastKey == 'Backspace') 
        value.innerText = value.innerText.slice(0 , value.innerHTML.length - 1) || 0
    if (lastKey == "AC") {
        value.innerText = 0
        firstValue = undefined
        operator = undefined
    }
  
    if (!isNaN(lastKey) || (lastKey == '.' && !value.innerText.includes('.'))) {
        if ((value.innerText + '').length > 9 && !justHitOperator)
            return
        if (value.innerText == 0 || justHitOperator || value.innerText == 'ERROR') 
            value.innerText = ''
        value.innerText += lastKey
        justHitOperator = false
    }

    if (['+', '-', '/', '÷', 'x', '*'].includes(lastKey)) {
        if (operator) 
            calculate()
        operator = lastKey 
        firstValue = value.innerText
        justHitOperator = true
    }

    if (lastKey == '+/-')
        value.innerText = -value.innerText * 1

    if (lastKey == '=' || lastKey == 'Enter')
        calculate()
}

function calculate() {
    if (operator == '+')
        value.innerText = 1 * firstValue + value.innerText * 1
    if (operator == '-')
        value.innerText = 1 * firstValue - value.innerText * 1
    if (operator == '*' || operator == 'x')
        value.innerText = firstValue * value.innerText
    if (operator == '/' || operator == '÷')
        value.innerText = firstValue / value.innerText
    if (value.innerText * 1 >= 10 ** 10)
        value.innerText = 'ERROR'
    if ((value.innerText + '').length > 10) 
        round(value.innerText)

    firstValue = 0
    operator = undefined
    justHitOperator = true
}

function round(n) {
    let position = (n + '').indexOf('.')
    value.innerText = Math.round(n * (10 ** (10 - position))) / 10 ** (10 - position)
}