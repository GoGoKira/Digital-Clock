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

// Renderizar o calendário ao carregar a página
renderCalendar();