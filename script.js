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