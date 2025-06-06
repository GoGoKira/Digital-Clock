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

// Abrir e fechar menus
function toggleMenu(menuId, show) {
    const menu = document.getElementById(menuId);
    menu.style.display = show ? 'block' : 'none';
}

// Temporizador
document.getElementById('timerButton').addEventListener('click', () => toggleMenu('timerMenu', true));
document.getElementById('closeTimer').addEventListener('click', () => toggleMenu('timerMenu', false));

// Cronômetro
document.getElementById('stopwatchButton').addEventListener('click', () => toggleMenu('stopwatchMenu', true));
document.getElementById('closeStopwatch').addEventListener('click', () => toggleMenu('stopwatchMenu', false));

// Alarmes
const alarmList = [];

// Abrir e fechar o menu de alarmes
document.getElementById('alarmButton').addEventListener('click', () => toggleMenu('alarmMenu', true));
document.getElementById('closeAlarm').addEventListener('click', () => toggleMenu('alarmMenu', false));

// Definir um novo alarme
document.getElementById('setAlarm').addEventListener('click', () => {
    const alarmTime = document.getElementById('alarmTime').value;
    if (alarmTime) {
        alarmList.push(alarmTime);
        renderAlarmList();
    }
});

// Renderizar a lista de alarmes
function renderAlarmList() {
    const alarmListElement = document.getElementById('alarmList');
    alarmListElement.innerHTML = ''; // Limpa a lista antes de renderizar

    alarmList.forEach((alarm, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Alarme: ${alarm}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.addEventListener('click', () => {
            alarmList.splice(index, 1); // Remove o alarme da lista
            renderAlarmList(); // Atualiza a lista
        });

        listItem.appendChild(deleteButton);
        alarmListElement.appendChild(listItem);
    });
}

// Verificar alarmes a cada segundo
setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (alarmList.includes(currentTime)) {
        alert('Alarme tocando!');
        const index = alarmList.indexOf(currentTime);
        alarmList.splice(index, 1); // Remove o alarme acionado
        renderAlarmList(); // Atualiza a lista
    }
}, 1000);

// Configurações
document.getElementById('settingsButton').addEventListener('click', () => toggleMenu('settingsMenu', true));
document.getElementById('closeSettings').addEventListener('click', () => toggleMenu('settingsMenu', false));

// Aplicar configurações
document.getElementById('applySettings').addEventListener('click', () => {
    const color = document.getElementById('colorPicker').value;
    const font = document.getElementById('fontPicker').value;

    document.getElementById('time').style.color = color;
    document.getElementById('date').style.color = color;
    document.getElementById('time').style.fontFamily = font;
    document.getElementById('date').style.fontFamily = font;

    toggleMenu('settingsMenu', false);
});

// Alterar imagem de fundo
document.getElementById('backgroundPicker').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    }
});

// Temas
document.getElementById('lightTheme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.body.style.backgroundImage = ''; // Remove a imagem de fundo
});

document.getElementById('darkTheme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    document.body.style.backgroundImage = ''; // Remove a imagem de fundo
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

// Função para buscar o clima
async function fetchWeather() {
    const apiKey = 'SUA_API_KEY';
    const city = 'São Paulo';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
    const data = await response.json();
    document.getElementById('date').textContent += ` - Clima: ${data.weather[0].description}, ${data.main.temp}°C`;
}

fetchWeather();
