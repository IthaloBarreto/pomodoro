const html = document.querySelector('html')
const pomodoroButton = document.querySelector('.pomodoro__button')
const shortButton = document.querySelector('.short__button')
const longButton = document.querySelector('.long__button')
const buttons = document.querySelectorAll('.container__buttons button')
const startBtn = document.querySelector('.start')
const timer = document.querySelector('.timer')

let tempoDecorridoEmSegundo = 1500
let intervaloId = null

pomodoroButton.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 1500
    alterarContexto('pomodoro')
    pomodoroButton.classList.add('active')
})

shortButton.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 300
    alterarContexto('curto')
    shortButton.classList.add('active')
})

longButton.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 900
    alterarContexto('longo')
    longButton.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    buttons.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    
    html.setAttribute('data-contexto', contexto)
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundo <= 0) {
        zerar()
        alert('Tempo finalizado')
        return
    }
    tempoDecorridoEmSegundo -= 1
    mostrarTempo()
}

startBtn.addEventListener('click', iniciar)

function iniciar() {
    if(intervaloId) {
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    startBtn.textContent = `PAUSAR`
}

function zerar() {
    clearInterval(intervaloId)
    startBtn.textContent = `COMEÇAR`
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundo * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()