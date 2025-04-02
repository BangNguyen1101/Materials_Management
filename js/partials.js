class PartialViewLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadPartials();
        this.setupActiveNavigation();
        this.setupEventListeners();
    }

    async loadPartials() {
        try {
            // Load sidebar
            const sidebarResponse = await fetch('partials/sidebar.html');
            const sidebarHtml = await sidebarResponse.text();
            document.querySelector('#sidebar-container').innerHTML = sidebarHtml;

            // Load header
            const headerResponse = await fetch('partials/header.html');
            const headerHtml = await headerResponse.text();
            document.querySelector('#header-container').innerHTML = headerHtml;

            // Set current page title
            this.setCurrentPageTitle();
        } catch (error) {
            console.error('Error loading partials:', error);
        }
    }

    setupActiveNavigation() {
        // Get current page from URL
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        
        // Remove any existing active classes
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.classList.remove('active');
        });

        // Add active class to current page
        const currentNavItem = document.querySelector(`[data-page="${currentPage}"]`);
        if (currentNavItem) {
            currentNavItem.classList.add('active');
        }
    }

    setCurrentPageTitle() {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const titles = {
            'users': 'Quản lý người dùng',
            'roles': 'Quản lý quyền',
            // Add more pages as needed
        };

        const pageTitle = titles[currentPage] || 'Trang chủ';
        document.querySelector('.current-page').textContent = pageTitle;
    }

    setupEventListeners() {
        // Toggle sidebar
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('collapsed');
                document.querySelector('.main-content').classList.toggle('expanded');
            });
        }

        // User menu dropdown
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userMenu.classList.remove('active');
            });
        }
    }
}

// Initialize partial view loader
document.addEventListener('DOMContentLoaded', () => {
    new PartialViewLoader();
}); 