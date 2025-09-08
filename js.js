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
    };

    const themeSwitcher = function() {
        const themeButton = document.querySelector('.theme-btn');
        
        if (!themeButton) {
            return;
        }
        
        const switchTheme = function() {
            const isLightTheme = document.body.classList.contains('light-theme');
            const targetTheme = !isLightTheme;
            
            document.body.classList.add('theme-transitioning');
            requestAnimationFrame(() => {
                if (targetTheme) {
                    document.body.classList.add('light-theme');
                    themeButton.innerHTML = '☀️';
                } else {
                    document.body.classList.remove('light-theme');
                    themeButton.innerHTML = '🌙';
                }
                
                localStorage.setItem('theme', targetTheme ? 'light' : 'dark');
                
                setTimeout(() => {
                    document.body.classList.remove('theme-transitioning');
                }, 500);
            });
        };
        
        themeButton.addEventListener('click', switchTheme);
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeButton.innerHTML = '☀️';
        }
    };

   const setupContactButton = function() {
    const contactBtn = document.getElementById('contact-btn');
    const contactExpand = document.querySelector('.contact-expand');
    const closeButton = document.querySelector('.close-telegram');
    
    if (!contactBtn || !contactExpand || !closeButton) {
        return;
    }
    
    console.log('Кнопка найдена, настраиваю...');
    
    contactBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        contactExpand.classList.add('expanded');
    });
    

    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        contactExpand.classList.remove('expanded');
    });
    

    document.addEventListener('click', function(e) {
        if (contactExpand.classList.contains('expanded') && 
            !contactExpand.contains(e.target)) {
            console.log('Закрываем меню по клику вне');
            contactExpand.classList.remove('expanded');
        }
    });
    

    const telegramButtons = document.querySelectorAll('.btn-telegram');
    telegramButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
};

    const init = function() {
        smoothScroll();
        animateOnScroll();
        interactiveElements();
        visitCounter();
        themeSwitcher();
        setupContactButton();
    };

    init();
});