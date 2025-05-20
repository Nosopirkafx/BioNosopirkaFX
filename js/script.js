// Раскрытие секретного текста
function revealSecret(element, event) {
    event.stopPropagation();
    if (!element.classList.contains('revealed')) {
        element.classList.add('active');
        setTimeout(() => {
            element.classList.remove('active');
            element.classList.add('revealed');
        }, 500);
    }
}

// Переход в Telegram
function goToTelegram(url, event) {
    event.stopPropagation();
    window.open(url, '_blank');
}

// Переключение вкладок
function switchTab(btn, page) {
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');
    // Здесь можно добавить загрузку контента для страницы
    // location.href = page + '.html';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Анимация точек для всех секретных значений
    document.querySelectorAll('.secret-value').forEach(secret => {
        setTimeout(() => {
            secret.classList.add('active');
        }, 100);
    });
    
    // Подсветка активной вкладки
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    if (currentPage) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.textContent.toLowerCase().includes(currentPage)) {
                btn.classList.add('active');
            }
        });
    }
});