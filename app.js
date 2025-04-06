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
}

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

// Função para renderizar o calendário
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    daysContainer.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.classList.add('day');
        dayDiv.addEventListener('click', () => openAgenda(day));
        daysContainer.appendChild(dayDiv);
    }
}

// Abrir o calendário
calendarButton.addEventListener('click', () => {
    calendarContainer.classList.remove('hidden');
    renderCalendar();
});

// Fechar o calendário
closeCalendar.addEventListener('click', () => {
    calendarContainer.classList.add('hidden');
});

// Abrir a agenda
function openAgenda(day) {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    agendaContent.textContent = agenda[key] || 'Sem eventos';
    agendaInput.value = '';
    agendaModal.classList.remove('hidden');
    saveAgenda.onclick = () => {
        agenda[key] = agendaInput.value;
        agendaModal.classList.add('hidden');
    };
}

// Fechar a agenda
closeAgenda.addEventListener('click', () => {
    agendaModal.classList.add('hidden');
});
