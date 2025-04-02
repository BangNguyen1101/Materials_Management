document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        // Basic validation
        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        // Here you would typically make an API call to authenticate
        // For demo purposes, we'll just simulate a successful login
        const loginData = {
            email,
            password,
            remember
        };

        console.log('Login attempt:', loginData);
        
        // Simulate API call
        setTimeout(() => {
            // Redirect to dashboard on success
            window.location.href = 'users.html';
        }, 1000);
    });
}); 