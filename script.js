document.addEventListener('DOMContentLoaded', function() {
    let lightmode = localStorage.getItem('light-mode');
    const themeSwitch = document.querySelector('.theme-btn');

    const enableLightmode = () => {
        document.body.classList.add('light-mode');
        localStorage.setItem('light-mode', 'active');
        const themeIcon = document.querySelector('.theme-icon img');
        if (themeIcon) {
            themeIcon.src = './images/icon-moon.svg';
        }
    }

// Extension data
const extensions = [
    {
        status: 'active',
        icon: 'blue-icon',
        logo: './images/logo-devlens.svg',
        name: 'DevLens',
        description: 'Quickly inspect page layouts and visualize element boundaries.'
    },
    {
        status: 'active',
        icon: 'teal-icon',
        logo: './images/logo-style-spy.svg',
        name: 'StyleSpy',
        description: 'Instantly analyze and copy CSS from any webpage element.'
    },
    {
        status: 'inactive',
        icon: 'pink-icon',
        logo: './images/logo-speed-boost.svg',
        name: 'SpeedBoost',
        description: 'Optimizes browser resource usage to accelerate page loading.'
    },
    {
        status: 'active',
        icon: 'purple-icon',
        logo: './images/logo-json-wizard.svg',
        name: 'JSONWizard',
        description: 'Formats, validates, and prettifies JSON responses in-browser.'
    },
    {
        status: 'active',
        icon: 'blue-gray-icon',
        logo: './images/logo-tab-master-pro.svg',
        name: 'TabMaster Pro',
        description: 'Organizes browser tabs into groups and sessions.'
    },
    {
        status: 'inactive',
        icon: 'light-blue-icon',
        logo: './images/logo-viewport-buddy.svg',
        name: 'ViewportBuddy',
        description: 'Simulates various screen resolutions directly within the browser.'
    },
    {
        status: 'active',
        icon: 'cyan-icon',
        logo: './images/logo-markup-notes.svg',
        name: 'Markup Notes',
        description: 'Enables annotation and notes directly onto webpages for collaborative debugging.'
    },
    {
        status: 'inactive',
        icon: 'grid-icon',
        logo: './images/logo-grid-guides.svg',
        name: 'GridGuides',
        description: 'Overlay customizable grids and alignment guides on any webpage.'
    },
    {
        status: 'active',
        icon: 'green-icon',
        logo: './images/logo-palette-picker.svg',
        name: 'Palette Picker',
        description: 'Instantly extracts color palettes from any webpage.'
    },
    {
        status: 'active',
        icon: 'orange-icon',
        logo: './images/logo-link-checker.svg',
        name: 'LinkChecker',
        description: 'Scans and highlights broken links on any page.'
    },
    {
        status: 'inactive',
        icon: 'dark-teal-icon',
        logo: './images/logo-dom-snapshot.svg',
        name: 'DOM Snapshot',
        description: 'Capture and export DOM structures quickly.'
    },
    {
        status: 'active',
        icon: 'console-icon',
        logo: './images/logo-console-plus.svg',
        name: 'ConsolePlus',
        description: 'Enhanced developer console with advanced filtering and logging.'
    }
];

// Function to create a single extension card
function createExtensionCard(extension) {
    const card = document.createElement('div');
    card.className = 'extension-card';
    card.setAttribute('data-status', extension.status);
    
    card.innerHTML = `
        <div class="extension-info">
            <div class="extension-icon ${extension.icon}">
                <img src="${extension.logo}"/>
            </div>
            <div class="extension-details">
                <h3>${extension.name}</h3>
                <p>${extension.description}</p>
            </div>
        </div>
        <div class="extension-control">
            <button class="remove-btn">Remove</button>
            <label class="switch">
                <input type="checkbox" ${extension.status === 'active' ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
    `;
    
    return card;
}

// Function to render all extensions
function renderExtensions(containerId = 'extensions-container') {
    const container = document.getElementById(containerId) || document.querySelector('.extensions');
    
    if (!container) {
        console.error('Container not found. Make sure you have an element with the specified ID or class "extensions"');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    container.className = 'extensions';
    
    // Create and append each extension card
    extensions.forEach(extension => {
        const card = createExtensionCard(extension);
        container.appendChild(card);
    });
    
    // Add event listeners for functionality
    addEventListeners();
}

// Function to add event listeners for interactive functionality
function addEventListeners() {
    // Remove button functionality
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = e.target.closest('.extension-card');
            if (confirm('Are you sure you want to remove this extension?')) {
                card.remove();
            }
        });
    });
    
    // Toggle switch functionality
    document.querySelectorAll('.switch input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            const card = e.target.closest('.extension-card');
            const newStatus = e.target.checked ? 'active' : 'inactive';
            card.setAttribute('data-status', newStatus);
            console.log(`Extension toggled to: ${newStatus}`);
        });
    });
}

// Function to add a new extension
function addExtension(extensionData) {
    extensions.push(extensionData);
    const container = document.querySelector('.extensions');
    if (container) {
        const card = createExtensionCard(extensionData);
        container.appendChild(card);
        // Re-add event listeners for the new card
        addEventListeners();
    }
}

// Function to get all active extensions
function getActiveExtensions() {
    return extensions.filter(ext => ext.status === 'active');
}

// Function to get all inactive extensions
function getInactiveExtensions() {
    return extensions.filter(ext => ext.status === 'inactive');
}

// Initialize the extensions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderExtensions();
});

// Export functions for use in other files (if using modules)
// export { renderExtensions, addExtension, getActiveExtensions, getInactiveExtensions };

    const disableLightmode = () => {
        document.body.classList.remove('light-mode');
        localStorage.setItem('light-mode', null);
        const themeIcon = document.querySelector('.theme-icon img');
        if (themeIcon) {
            themeIcon.src = './images/icon-sun.svg';
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

    const tabButtons = document.querySelectorAll('.toggle-btn');
    const extensionCards = document.querySelectorAll('.extension-card');

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