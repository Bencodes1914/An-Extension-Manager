document.addEventListener('DOMContentLoaded', function() {
    // Theme switching code (your existing code)
    let lightmode = localStorage.getItem('light-mode');
    const themeSwitch = document.querySelector('.theme-btn');

    const enableLightmode = () => {
        document.body.classList.add('light-mode');
        localStorage.setItem('light-mode', 'active');
        const themeIcon = document.querySelector('.theme-icon img');
        if (themeIcon) {
            themeIcon.src = './Images/icon-moon.svg';
        }
    }

    const disableLightmode = () => {
        document.body.classList.remove('light-mode');
        localStorage.setItem('light-mode', null);
        const themeIcon = document.querySelector('.theme-icon img');
        if (themeIcon) {
            themeIcon.src = './Images/icon-sun.svg';
        }
    }

    if (lightmode === "active") {
        enableLightmode();
    }

    if (themeSwitch) {
        themeSwitch.addEventListener("click", () => {
            lightmode = localStorage.getItem('light-mode');
            lightmode !== "active" ? enableLightmode() : disableLightmode();
        });
    }

    // Filtering code - FIXED: Changed .tab-btn to .toggle-btn
    const tabButtons = document.querySelectorAll('.toggle-btn');
    const extensionCards = document.querySelectorAll('.extension-card');

    // Debug: Check if elements are found
    console.log('Tab buttons found:', tabButtons.length);
    console.log('Extension cards found:', extensionCards.length);

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.getAttribute('data-filter'));
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterExtensions(filter);
        });
    });

    function filterExtensions(filter) {
        console.log('Filtering by:', filter);
        
        extensionCards.forEach(card => {
            const status = card.getAttribute('data-status');
            console.log('Card status:', status);
            
            let shouldShow = false;
            
            switch(filter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'active':
                    shouldShow = status === 'active';
                    break;
                case 'inactive':
                    shouldShow = status === 'inactive';
                    break;
            }
            
            if (shouldShow) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});