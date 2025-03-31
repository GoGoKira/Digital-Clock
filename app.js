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

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Chama a função para definir o relógio imediatamente
updateClock();

// Função para abrir a página da agenda
function openCalendar() {
    window.open('agenda.html', '_self'); // Abre a página agenda.html na mesma aba
}

// Adiciona o evento de clique ao botão
document.getElementById('calendarButton').addEventListener('click', openCalendar);

const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Atualiza o título do mês e ano
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Limpa os dias anteriores
    daysContainer.innerHTML = '';

    // Obtém o primeiro e último dia do mês
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Preenche os dias em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.classList.add('day');
        daysContainer.appendChild(dayDiv);
    }
}

// Navegação entre meses
prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Renderiza o calendário inicial
renderCalendar();

const yearCalendar = document.getElementById('yearCalendar');
const currentYear = new Date().getFullYear();

function generateYearCalendar(year) {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');

        const monthTitle = document.createElement('h2');
        monthTitle.textContent = `${monthNames[month]} ${year}`;
        monthDiv.appendChild(monthTitle);

        const daysGrid = document.createElement('div');
        daysGrid.classList.add('days-grid');

        // Adiciona os nomes dos dias da semana
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        dayNames.forEach(dayName => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day-name');
            dayNameDiv.textContent = dayName;
            daysGrid.appendChild(dayNameDiv);
        });

        // Obtém o primeiro dia do mês e o número de dias no mês
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Preenche os dias em branco antes do primeiro dia do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            daysGrid.appendChild(emptyDiv);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= lastDate; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            daysGrid.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysGrid);
        yearCalendar.appendChild(monthDiv);
    }
}

// Gera o calendário para o ano atual
generateYearCalendar(currentYear);
