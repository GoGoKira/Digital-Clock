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

// Função para abrir o calendário
function openCalendar() {
    window.open('https://calendar.google.com', '_blank');
}

// Adiciona o evento de clique ao botão
document.getElementById('calendarButton').addEventListener('click', openCalendar);