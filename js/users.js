document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const addUserBtn = document.getElementById('addUserBtn');
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    const addUserModal = document.getElementById('addUserModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const deactivateConfirmModal = document.getElementById('deactivateConfirmModal');
    const userTableBody = document.getElementById('userTableBody');
    const selectAllCheckbox = document.getElementById('selectAll');
    const searchInput = document.querySelector('.search-box input');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Sample user data
    const users = [
        {
            name: 'Đỗ Tâm',
            username: 'tamdt',
            type: 'Nhân viên',
            organization: 'Cty CP TNHH 1',
            joinDate: '16/09/2024'
        },
        {
            name: 'Văn Hồng',
            username: 'hungvn',
            type: 'Quản trị viên',
            organization: 'Cty CP TNHH 1',
            joinDate: '16/09/2024'
        },
        {
            name: 'Minh Đức',
            username: 'ducnm',
            type: 'Nhân viên',
            organization: 'Cty CP TNHH 1',
            joinDate: '16/09/2024'
        }
    ];

    // Functions
    const toggleModal = (modal, show = true) => {
        modal.style.display = show ? 'flex' : 'none';
    };

    const renderUsers = (userList = users) => {
        userTableBody.innerHTML = userList.map(user => `
            <tr>
                <td><input type="checkbox" class="user-select"></td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.type}</td>
                <td>${user.organization}</td>
                <td>${user.joinDate}</td>
                <td>
                    <button class="btn-action view-user" title="Xem"><i class="fas fa-eye"></i></button>
                    <button class="btn-action edit-user" title="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete-user" title="Xóa"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');

        // Reattach event listeners
        attachUserActionListeners();
    };

    const attachUserActionListeners = () => {
        // View user buttons
        document.querySelectorAll('.view-user').forEach(btn => {
            btn.addEventListener('click', () => {
                // Implement view user functionality
                console.log('View user clicked');
            });
        });

        // Edit user buttons
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', () => {
                // Implement edit user functionality
                console.log('Edit user clicked');
            });
        });

        // Delete user buttons
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', () => {
                toggleModal(deleteConfirmModal);
            });
        });
    };

    // Event Listeners
    addUserBtn.addEventListener('click', () => {
        toggleModal(addUserModal);
    });

    deleteSelectedBtn.addEventListener('click', () => {
        const selectedUsers = document.querySelectorAll('.user-select:checked');
        if (selectedUsers.length > 0) {
            toggleModal(deleteConfirmModal);
        } else {
            alert('Vui lòng chọn người dùng cần xóa');
        }
    });

    // Close modals
    document.querySelectorAll('.close-modal, .modal .btn-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                toggleModal(modal, false);
            });
        });
    });

    // Select all checkbox
    selectAllCheckbox.addEventListener('change', (e) => {
        document.querySelectorAll('.user-select').forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm) ||
            user.type.toLowerCase().includes(searchTerm) ||
            user.organization.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    // Toggle sidebar on mobile
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Handle form submission
    document.getElementById('addUserForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log('Form submitted');
        toggleModal(addUserModal, false);
    });

    // Initial render
    renderUsers();
}); 