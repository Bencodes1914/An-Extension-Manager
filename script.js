 // State management - using in-memory storage instead of localStorage
        let appState = {
            lightMode: false,
            currentFilter: 'all'
        };

        // Extension data
        const extensions = [
            {
                id: 'devlens',
                status: 'active',
                icon: './images/logo-devlens.svg',
                name: 'DevLens',
                description: 'Quickly inspect page layouts and visualize element boundaries.'
            },
            {
                id: 'stylespy',
                status: 'active',
                icon: './images/logo-style-spy.svg',
                name: 'StyleSpy',
                description: 'Instantly analyze and copy CSS from any webpage element.'
            },
            {
                id: 'speedboost',
                status: 'inactive',
                icon: './images/logo-speed-boost.svg',
                name: 'SpeedBoost',
                description: 'Optimizes browser resource usage to accelerate page loading.'
            },
            {
                id: 'jsonwizard',
                status: 'active',
                icon: './images/logo-json-wizard.svg',
                name: 'JSONWizard',
                description: 'Formats, validates, and prettifies JSON responses in-browser.'
            },
            {
                id: 'tabmaster',
                status: 'active',
                icon: './images/logo-tab-master-pro.svg',
                name: 'TabMaster Pro',
                description: 'Organizes browser tabs into groups and sessions.'
            },
            {
                id: 'viewportbuddy',
                status: 'inactive',
                icon: './images/logo-viewport-buddy.svg',
                name: 'Viewport Buddy',
                description: 'Simulates various screen resolutions directly within the browser.'
            },
            {
                id: 'markupnotes',
                status: 'active',
                icon: './images/logo-markup-notes.svg',
                name: 'Markup Notes',
                description: 'Enables annotation and notes directly onto webpages for collaborative debugging.'
            },
            {
                id: 'gridguides',
                status: 'inactive',
                icon: './images/logo-grid-guides.svg',
                name: 'GridGuides',
                description: 'Overlay customizable grids and alignment guides on any webpage.'
            },
            {
                id: 'palettepicker',
                status: 'active',
                icon: './images/logo-palette-picker.svg',
                name: 'Palette Picker',
                description: 'Instantly extracts color palettes from any webpage.'
            },
            {
                id: 'linkchecker',
                status: 'active',
                icon: './images/logo-link-checker.svg',
                name: 'LinkChecker',
                description: 'Scans and highlights broken links on any page.'
            },
            {
                id: 'domsnapshot',
                status: 'inactive',
                icon: './images/logo-dom-snapshot.svg',
                name: 'DOM Snapshot',
                description: 'Capture and export DOM structures quickly.'
            },
            {
                id: 'consoleplus',
                status: 'active',
                icon: './images/logo-console-plus.svg',
                name: 'ConsolePlus',
                description: 'Enhanced developer console with advanced filtering and logging.'
            }
        ];

        // Theme management
        function initializeTheme() {
            const themeToggle = document.getElementById('theme-toggle');
            
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
            }
        }

        function toggleTheme() {
            appState.lightMode = !appState.lightMode;
            
            if (appState.lightMode) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }
        }

        // Extension card creation
        function createExtensionCard(extension) {
            const card = document.createElement('div');
            card.className = 'extension-card fade-in';
            card.setAttribute('data-status', extension.status);
            card.setAttribute('data-id', extension.id);
            
            card.innerHTML = `
                <div class="extension-info">
                    <div class="extension-icon">
                        <img src="${extension.icon}" alt="${extension.name} icon">
                    </div>
                    <div class="extension-details">
                        <h3>${extension.name}</h3>
                        <p>${extension.description}</p>
                    </div>
                </div>
                <div class="extension-control">
                    <button class="remove-btn" data-id="${extension.id}" aria-label="Remove ${extension.name}">Remove</button>
                    <label class="switch" aria-label="Toggle ${extension.name}">
                        <input type="checkbox" ${extension.status === 'active' ? 'checked' : ''} data-id="${extension.id}" aria-label="Enable/disable ${extension.name}">
                        <span class="slider round"></span>
                    </label>
                </div>
            `;
            
            return card;
        }

        // Extension rendering
        function renderExtensions() {
            const container = document.getElementById('extensions-container');
            
            if (!container) {
                console.error('Extensions container not found');
                return;
            }
            
            // Clear existing content
            container.innerHTML = '';
            
            // Filter extensions based on current filter and search
            const filteredExtensions = filterExtensions(extensions);
            
            if (filteredExtensions.length === 0) {
                container.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-primary); opacity: 0.6;">
                        <p>No extensions found matching your criteria.</p>
                    </div>
                `;
                return;
            }
            
            // Create and append each extension card
            filteredExtensions.forEach(extension => {
                const card = createExtensionCard(extension);
                container.appendChild(card);
            });
            
            // Add event listeners for the newly created cards
            addExtensionEventListeners();
        }

        // Filter extensions by status
        function filterExtensions(extensionList) {
            switch(appState.currentFilter) {
                case 'active':
                    return extensionList.filter(ext => ext.status === 'active');
                case 'inactive':
                    return extensionList.filter(ext => ext.status === 'inactive');
                case 'all':
                default:
                    return extensionList;
            }
        }

        // Event listeners for extension cards
        function addExtensionEventListeners() {
            // Remove button functionality
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', handleRemoveExtension);
            });
            
            // Toggle switch functionality
            document.querySelectorAll('.switch input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', handleToggleExtension);
            });
        }

        // Handle extension removal
        function handleRemoveExtension(e) {
            const extensionId = e.target.getAttribute('data-id');
            const extension = extensions.find(ext => ext.id === extensionId);
            
            if (!extension) return;
            
            if (confirm(`Are you sure you want to remove ${extension.name}?`)) {
                // Remove from extensions array
                const index = extensions.findIndex(ext => ext.id === extensionId);
                if (index > -1) {
                    extensions.splice(index, 1);
                }
                
                // Re-render extensions
                renderExtensions();
                
                console.log(`Extension ${extension.name} removed`);
            }
        }

        // Handle extension toggle
        function handleToggleExtension(e) {
            const extensionId = e.target.getAttribute('data-id');
            const isActive = e.target.checked;
            
            // Update extension status
            const extension = extensions.find(ext => ext.id === extensionId);
            if (extension) {
                extension.status = isActive ? 'active' : 'inactive';
                
                // Update the card's data attribute
                const card = e.target.closest('.extension-card');
                if (card) {
                    card.setAttribute('data-status', extension.status);
                }
                
                console.log(`Extension ${extension.name} ${isActive ? 'activated' : 'deactivated'}`);
            }
        }

        // Filter tab management
        function initializeFilterTabs() {
            const tabButtons = document.querySelectorAll('.toggle-btn');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', handleFilterChange);
            });
        }

        function handleFilterChange(e) {
            const filter = e.target.getAttribute('data-filter');
            
            // Update active tab
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update state and re-render
            appState.currentFilter = filter;
            renderExtensions();
            
            console.log(`Filter changed to: ${filter}`);
        }

        // Initialize the application
        function initializeApp() {
            console.log('Initializing Extensions Manager...');
            
            // Initialize theme
            initializeTheme();
            
            // Initialize filter tabs
            initializeFilterTabs();
            
            // Render extensions
            renderExtensions();
            
            console.log('Extensions Manager initialized successfully');
            console.log(`Total extensions: ${extensions.length}`);
            console.log(`Active extensions: ${getActiveExtensions().length}`);
            console.log(`Inactive extensions: ${getInactiveExtensions().length}`);
        }

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }

        // Export functions for potential use in other files
        window.ExtensionsManager = {
            addExtension,
            getActiveExtensions,
            getInactiveExtensions,
            renderExtensions
        };