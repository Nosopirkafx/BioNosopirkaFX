// Раскрытие секретного текста
function revealSecret(element, event) {
    event.stopPropagation();
    if (!element.classList.contains('revealed')) {
        element.classList.add('active');
        setTimeout(() => {
            element.classList.remove('active');
            element.classList.add('revealed');
        }, 100);
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

// Добавьте в script.js
function setAnimatedBG() {
    const bgDiv = document.createElement('div');
    bgDiv.style.position = 'fixed';
    bgDiv.style.top = '0';
    bgDiv.style.left = '0';
    bgDiv.style.width = '100%';
    bgDiv.style.height = '100%';
    bgDiv.style.background = 'url(files/animation.gif) center/cover no-repeat';
    bgDiv.style.opacity = '0.2';
    bgDiv.style.zIndex = '-1';
    bgDiv.style.pointerEvents = 'none';
    document.body.appendChild(bgDiv);
}

document.addEventListener('DOMContentLoaded', setAnimatedBG);

function initRain() {
    const canvas = document.getElementById('rain-canvas');
    const ctx = canvas.getContext('2d');
    
    // Настройки дождя
    const config = {
        angle: 15, // Угол наклона дождя (градусы)
        speed: 11, // Общая скорость
        dropsCount: 170, // Количество капель
        lengthVariation: 0.8 // Вариация длины капель (0-1)
    };
    
    // Устанавливаем размеры canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    const drops = [];
    const radAngle = config.angle * Math.PI / 180; // Конвертируем в радианы
    const cosAngle = Math.cos(radAngle);
    const sinAngle = Math.sin(radAngle);
    
    class Drop {
        constructor() {
            this.reset();
            this.xSpeed = config.speed * sinAngle * this.z;
            this.ySpeed = config.speed * cosAngle * this.z;
        }
        
        reset() {
            this.z = Math.random() * 0.5 + 0.5; // 0.5-1.0
            this.len = (10 + Math.random() * 10) * config.lengthVariation * this.z;
            this.x = Math.random() * (canvas.width + canvas.height * Math.tan(radAngle));
            this.y = Math.random() * -100 - this.len;
            this.opacity = 0.4 * this.z;
        }
        
        update() {
            this.x -= this.xSpeed;
            this.y += this.ySpeed;
            
            // Если капля ушла за границы
            if (this.y > canvas.height || 
                this.x < -this.len || 
                this.x > canvas.width + this.len) {
                this.reset();
            }
        }
        
        draw() {
            ctx.strokeStyle = `rgba(180, 160, 255, ${this.opacity})`;
            ctx.lineWidth = 1 * this.z;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.len*sinAngle, this.y + this.len*cosAngle);
            ctx.stroke();
        }
    }
    
    // Создаем капли
    for (let i = 0; i < config.dropsCount; i++) {
        drops.push(new Drop());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach(drop => {
            drop.update();
            drop.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

document.addEventListener('DOMContentLoaded', initRain);