let lightmode = localStorage.getItem('light-mode');
const themeSwitch = document.querySelector('.theme-btn'); // Fixed: use querySelector instead of getElementsByClassName

const enableLightmode = () => {
    document.body.classList.add('light-mode');
    localStorage.setItem('light-mode', 'active');
    // Change icon to moon when light mode is enabled
    const themeIcon = document.querySelector('.theme-icon img');
    if (themeIcon) {
        themeIcon.src = './Images/icon-moon.svg';
    }
}

const disableLightmode = () => {
    document.body.classList.remove('light-mode');
    localStorage.setItem('light-mode', null);
    // Change icon to sun when light mode is disabled
    const themeIcon = document.querySelector('.theme-icon img');
    if (themeIcon) {
        themeIcon.src = './Images/icon-sun.svg';
    }
}

// Check if light mode was previously enabled
if (lightmode === "active") {
    enableLightmode();
}

// Add event listener to theme switch button
themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem('light-mode'); // Get current state
    lightmode !== "active" ? enableLightmode() : disableLightmode();
});

// Get the filter buttons and extension cards
const tabButtons = document.querySelectorAll('.tab-btn');
const extensionCards = document.querySelectorAll('.extension-card');

// Add click event to each filter button
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        button.classList.add('active');
        
        // Get the filter type (all, active, or inactive)
        const filter = button.getAttribute('data-filter');
        
        // Filter the extensions
        filterExtensions(filter);
    });
});

// Function that shows/hides extensions based on filter
function filterExtensions(filter) {
    extensionCards.forEach(card => {
        const status = card.getAttribute('data-status');
        let shouldShow = false;
        
        // Decide which cards to show
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
        
        // Show or hide the card
        if (shouldShow) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}