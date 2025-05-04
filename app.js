// Atualizar o relógio
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    document.getElementById('time').textContent = timeString;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('pt-BR', options);
    document.getElementById('date').textContent = dateString;

    document.getElementById('date').textContent += ` - Fase da Lua: ${getMoonPhase()}`;
}

// Função para obter a fase da lua
function getMoonPhase() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const lp = 2551443; // Duração média de um ciclo lunar em segundos
    const newMoon = new Date(1970, 0, 7, 20, 35, 0); // Data de uma lua nova conhecida
    const phase = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const phaseIndex = Math.floor((phase / lp) * 8);

    const phases = ['Nova', 'Crescente Côncava', 'Quarto Crescente', 'Crescente Convexa', 'Cheia', 'Minguante Convexa', 'Quarto Minguante', 'Minguante Côncava'];
    return phases[phaseIndex];
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock();

// Configurações
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const applySettingsButton = document.getElementById('applySettings');
const closeSettingsButton = document.getElementById('closeSettings');

// Abrir o menu de configurações
settingsButton.addEventListener('click', () => {
    settingsMenu.style.display = 'block';
});

// Fechar o menu de configurações
closeSettingsButton.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
});

// Aplicar configurações
applySettingsButton.addEventListener('click', () => {
    // Alterar a cor do relógio
    const color = document.getElementById('colorPicker').value;
    document.getElementById('time').style.color = color;
    document.getElementById('date').style.color = color;

    // Alterar a fonte
    const font = document.getElementById('fontPicker').value;
    document.getElementById('time').style.fontFamily = font;
    document.getElementById('date').style.fontFamily = font;

    // Alterar o estilo dos botões
    const buttonStyle = document.getElementById('buttonStyle').value;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('rounded', 'flat');
        if (buttonStyle === 'rounded') {
            button.classList.add('rounded');
        } else if (buttonStyle === 'flat') {
            button.classList.add('flat');
        }
    });

    // Fechar o menu de configurações
    settingsMenu.style.display = 'none';
});

// Variáveis globais
const calendarButton = document.getElementById('calendarButton');
const calendarContainer = document.getElementById('calendarContainer');
const closeCalendar = document.getElementById('closeCalendar');
const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('monthYear');
const agendaModal = document.getElementById('agendaModal');
const agendaContent = document.getElementById('agendaContent');
const agendaInput = document.getElementById('agendaInput');
const saveAgenda = document.getElementById('saveAgenda');
const closeAgenda = document.getElementById('closeAgenda');

let currentDate = new Date();
let agenda = {};

// Timer
let timerInterval;

document.getElementById('startTimer').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    let totalSeconds = minutes * 60 + seconds;

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert('O tempo acabou!');
        } else {
            totalSeconds--;
            const displayMinutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
            const displaySeconds = String(totalSeconds % 60).padStart(2, '0');
            document.getElementById('timerDisplay').textContent = `${displayMinutes}:${displaySeconds}`;
        }
    }, 1000);
});

document.getElementById('stopTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
});

// Stopwatch
let stopwatchInterval;
let stopwatchSeconds = 0;

document.getElementById('startStopwatch').addEventListener('click', () => {
    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        const hours = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(stopwatchSeconds % 60).padStart(2, '0');
        document.getElementById('stopwatchDisplay').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
});

document.getElementById('pauseStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    document.getElementById('stopwatchDisplay').textContent = '00:00:00';
});

// Alarm
const alarmList = [];
document.getElementById('setAlarm').addEventListener('click', () => {
    const alarmTime = document.getElementById('alarmTime').value;
    if (alarmTime) {
        alarmList.push(alarmTime);
        const alarmItem = document.createElement('li');
        alarmItem.textContent = `Alarme definido para ${alarmTime}`;
        document.getElementById('alarmList').appendChild(alarmItem);
    }
});

setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (alarmList.includes(currentTime)) {
        alert('Alarme tocando!');
        const index = alarmList.indexOf(currentTime);
        alarmList.splice(index, 1); // Remove o alarme acionado
    }
}, 1000);

// Tema
document.getElementById('lightTheme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
});

document.getElementById('darkTheme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
});

// Função para buscar o clima
async function fetchWeather() {
    const apiKey = 'SUA_API_KEY';
    const city = 'São Paulo';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
    const data = await response.json();
    document.getElementById('date').textContent += ` - Clima: ${data.weather[0].description}, ${data.main.temp}°C`;
}

fetchWeather();
