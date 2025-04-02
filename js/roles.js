// Role management functionality
class RoleManager {
    constructor() {
        this.roles = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add role button
        document.getElementById('addRoleBtn').addEventListener('click', () => this.showAddRoleModal());
        
        // Save role button in add/edit modal
        document.getElementById('saveRoleBtn').addEventListener('click', () => this.saveRole());
        
        // Delete confirmation
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.deleteRole());
    }

    showAddRoleModal() {
        const modal = document.getElementById('addRoleModal');
        modal.style.display = 'block';
        // Reset form
        document.getElementById('roleForm').reset();
    }

    showEditRoleModal(role) {
        const modal = document.getElementById('editRoleModal');
        modal.style.display = 'block';
        
        // Populate form with role data
        document.getElementById('editRoleName').value = role.name;
        document.getElementById('editRoleDesc').value = role.description;
        
        // Set permissions
        this.setPermissions(role.permissions);
    }

    showDeleteModal(roleId) {
        const modal = document.getElementById('deleteRoleModal');
        modal.style.display = 'block';
        modal.dataset.roleId = roleId;
    }

    async saveRole() {
        const form = document.getElementById('roleForm');
        const formData = new FormData(form);
        
        const roleData = {
            name: formData.get('roleName'),
            description: formData.get('roleDesc'),
            permissions: this.getSelectedPermissions()
        };

        try {
            // API call would go here
            await this.saveRoleToServer(roleData);
            this.hideModals();
            this.refreshRoleList();
        } catch (error) {
            console.error('Error saving role:', error);
            alert('Error saving role. Please try again.');
        }
    }

    async deleteRole() {
        const modal = document.getElementById('deleteRoleModal');
        const roleId = modal.dataset.roleId;

        try {
            // API call would go here
            await this.deleteRoleFromServer(roleId);
            this.hideModals();
            this.refreshRoleList();
        } catch (error) {
            console.error('Error deleting role:', error);
            alert('Error deleting role. Please try again.');
        }
    }

    getSelectedPermissions() {
        const permissions = [];
        document.querySelectorAll('.permission-checkbox:checked').forEach(checkbox => {
            permissions.push({
                module: checkbox.dataset.module,
                value: checkbox.value
            });
        });
        return permissions;
    }

    setPermissions(permissions) {
        // Reset all checkboxes
        document.querySelectorAll('.permission-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Set selected permissions
        permissions.forEach(permission => {
            const checkbox = document.querySelector(`.permission-checkbox[data-module="${permission.module}"][value="${permission.value}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    hideModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    async refreshRoleList() {
        // API call to get updated role list would go here
        const roles = await this.getRolesFromServer();
        this.renderRoleList(roles);
    }

    renderRoleList(roles) {
        const container = document.getElementById('roleList');
        container.innerHTML = '';

        roles.forEach(role => {
            const row = this.createRoleRow(role);
            container.appendChild(row);
        });
    }

    createRoleRow(role) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${role.name}</td>
            <td>${role.description}</td>
            <td>
                <button class="edit-btn" onclick="roleManager.showEditRoleModal(${JSON.stringify(role)})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="roleManager.showDeleteModal('${role.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        return row;
    }

    // Server communication methods (to be implemented with actual API)
    async saveRoleToServer(roleData) {
        // Implement API call
    }

    async deleteRoleFromServer(roleId) {
        // Implement API call
    }

    async getRolesFromServer() {
        // Implement API call
        return [];
    }
}

// Initialize role manager
const roleManager = new RoleManager(); 