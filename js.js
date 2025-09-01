document.addEventListener('DOMContentLoaded', function() {
    const smoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    history.pushState(null, null, targetId);
                }
            });
        });
    };

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    const interactiveElements = function() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    };

    const visitCounter = function() {
        if (localStorage.getItem('visitCount')) {
            let count = parseInt(localStorage.getItem('visitCount'));
            count++;
            localStorage.setItem('visitCount', count);
        } else {
            localStorage.setItem('visitCount', '1');
        }
        console.log('Количество посещений:', localStorage.getItem('visitCount'));
    };

    const themeSwitcher = function() {
        const themeButton = document.querySelector('.theme-btn');
        
        if (!themeButton) {
            console.error('Кнопка темы не найдена!');
            return;
        }
        
        themeButton.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            this.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
            
            // Сохраняем тему в localStorage
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Восстанавливаем тему при загрузке
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeButton.innerHTML = '☀️';
        }
    };

    const init = function() {
        smoothScroll();
        animateOnScroll();
        interactiveElements();
        visitCounter();
        themeSwitcher();
    };

    init();
});