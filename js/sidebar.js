document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar content
    fetch('partials/sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('sidebar-container').innerHTML = html;
            initializeSidebar();
        })
        .catch(error => console.error('Error loading sidebar:', error));
});

function initializeSidebar() {
    // Set active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const menuItems = document.querySelectorAll('.sidebar-nav li');
    
    menuItems.forEach(item => {
        if (item.dataset.page === currentPage) {
            item.classList.add('active');
        }
    });

    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
    });

    // Handle responsive sidebar
    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            document.querySelector('.main-content').classList.add('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            document.querySelector('.main-content').classList.remove('expanded');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
} 