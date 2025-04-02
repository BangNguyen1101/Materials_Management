class WarehouseManager {
    constructor() {
        this.warehouses = [
            { id: 1, code: 'KOT001', name: 'Kho 1', type: 'Loại 1' },
            { id: 2, code: 'KOT001', name: 'Kho 1', type: 'Loại 2' },
            { id: 3, code: 'KOT001', name: 'Kho 1', type: 'Loại 3' },
            { id: 4, code: 'KOT002', name: 'Kho 2', type: 'Loại 1' },
            { id: 5, code: 'KOT002', name: 'Kho 2', type: 'Loại 1' },
            { id: 6, code: 'KOT002', name: 'Kho 2', type: 'Loại 2' }
        ];
        
        this.searchInput = document.getElementById('searchInput');
        this.clearSearchBtn = document.getElementById('clearSearch');
        this.tableBody = document.getElementById('warehouseTableBody');
        
        this.init();
    }

    init() {
        this.renderWarehouses(this.warehouses);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search input event
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            const filteredWarehouses = this.warehouses.filter(warehouse => 
                warehouse.code.toLowerCase().includes(searchTerm) ||
                warehouse.name.toLowerCase().includes(searchTerm) ||
                warehouse.type.toLowerCase().includes(searchTerm)
            );
            this.renderWarehouses(filteredWarehouses);
        });

        // Clear search button
        this.clearSearchBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.renderWarehouses(this.warehouses);
        });
    }

    renderWarehouses(warehouses) {
        this.tableBody.innerHTML = '';
        
        warehouses.forEach((warehouse, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${warehouse.code}</td>
                <td>${warehouse.name}</td>
                <td>${warehouse.type}</td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    async fetchWarehouses() {
        try {
            // In a real application, this would be an API call
            // const response = await fetch('/api/warehouses');
            // const data = await response.json();
            // this.warehouses = data;
            // this.renderWarehouses(this.warehouses);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    }
}

// Initialize the warehouse manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WarehouseManager();
}); 