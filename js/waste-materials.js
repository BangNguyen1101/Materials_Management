document.addEventListener('DOMContentLoaded', function() {
    initializeWasteMaterials();
});

function initializeWasteMaterials() {
    // Initialize search functionality
    const searchInput = document.getElementById('search-input');
    const warehouseSelect = document.getElementById('warehouse-select');
    const searchBtn = document.getElementById('search-btn');
    const erpSearchBtn = document.getElementById('erp-search-btn');

    // Initialize export buttons
    const excelExport = document.getElementById('excel-export');
    const pdfExport = document.getElementById('pdf-export');
    const printBtn = document.getElementById('print-btn');

    // Load initial data
    loadWarehouses();
    loadMaterialsData();

    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    erpSearchBtn.addEventListener('click', handleERPSearch);
    excelExport.addEventListener('click', handleExcelExport);
    pdfExport.addEventListener('click', handlePDFExport);
    printBtn.addEventListener('click', handlePrint);

    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => changePage(-1));
    document.getElementById('next-page').addEventListener('click', () => changePage(1));
}

// Load warehouses for the select dropdown
function loadWarehouses() {
    // Simulated warehouse data - replace with actual API call
    const warehouses = [
        { id: 'ZP1', name: 'Kho ZP1' },
        { id: 'KHO_A', name: 'Kho A' }
    ];

    const warehouseSelect = document.getElementById('warehouse-select');
    warehouses.forEach(warehouse => {
        const option = document.createElement('option');
        option.value = warehouse.id;
        option.textContent = warehouse.name;
        warehouseSelect.appendChild(option);
    });
}

// Load materials data
function loadMaterialsData(page = 1) {
    // Simulated data - replace with actual API call
    const materials = [
        {
            code: '1.31.23.451.000.00.000',
            name: 'Nhớt SAE 20W/30',
            warehouse: 'ZP1',
            subWarehouse: 'ZP1',
            unit: 'Lít',
            lot: '',
            quantity: 112,
            location: 'Tổ máy 1 → Giá 1 → Ngăn 1 → Hộc 4'
        },
        // Add more sample data as needed
    ];

    displayMaterialsData(materials);
}

// Display materials in the table
function displayMaterialsData(materials) {
    const tbody = document.getElementById('materials-list');
    tbody.innerHTML = '';

    materials.forEach(material => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${material.code}</td>
            <td>${material.name}</td>
            <td>${material.warehouse}</td>
            <td>${material.subWarehouse}</td>
            <td>${material.unit}</td>
            <td>${material.lot}</td>
            <td>${material.quantity}</td>
            <td>${material.location}</td>
            <td>
                <img src="assets/placeholder-image.png" alt="${material.name}" />
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Search handlers
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value;
    const warehouse = document.getElementById('warehouse-select').value;
    // Implement actual search logic here
    console.log('Searching for:', searchTerm, 'in warehouse:', warehouse);
    loadMaterialsData(); // Reload with search filters
}

function handleERPSearch() {
    const searchTerm = document.getElementById('search-input').value;
    // Implement ERP search logic here
    console.log('Searching in ERP for:', searchTerm);
}

// Export handlers
function handleExcelExport() {
    // Implement Excel export logic
    console.log('Exporting to Excel...');
}

function handlePDFExport() {
    // Implement PDF export logic
    console.log('Exporting to PDF...');
}

function handlePrint() {
    window.print();
}

// Pagination handler
function changePage(delta) {
    const currentPage = parseInt(document.querySelector('.current-page').textContent);
    const newPage = currentPage + delta;
    if (newPage > 0) {
        loadMaterialsData(newPage);
        document.querySelector('.current-page').textContent = newPage;
    }
} 