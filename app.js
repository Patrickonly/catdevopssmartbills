// Data Storage
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let bills = JSON.parse(localStorage.getItem('bills')) || [];
let pricePerMeter = parseFloat(localStorage.getItem('pricePerMeter')) || 500;
let currentUser = null;

// Format number to RWF currency with thousand separators
function formatRWF(amount) {
    return 'RWF ' + Number(amount).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// Format number with thousand separators
function formatNumber(num) {
    return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Login Handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (userType === 'admin') {
        if (username === 'admin' && password === 'admin123') {
            currentUser = { type: 'admin', username: 'admin' };
            showDashboard('admin');
            showToast('Welcome Admin!');
        } else {
            showToast('Invalid admin credentials', 'error');
        }
    } else {
        const customer = customers.find(c => c.id === username && c.password === password);
        if (customer) {
            currentUser = { type: 'customer', data: customer };
            showDashboard('customer');
            showToast(`Welcome ${customer.name}!`);
        } else {
            showToast('Invalid customer credentials', 'error');
        }
    }
});

// Show Dashboard
function showDashboard(type) {
    document.getElementById('loginPage').style.display = 'none';
    if (type === 'admin') {
        document.getElementById('adminDashboard').classList.add('active');
        loadAdminData();
    } else {
        document.getElementById('customerDashboard').classList.add('active');
        loadCustomerData();
    }
}

// Logout
function logout() {
    currentUser = null;
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('adminDashboard').classList.remove('active');
    document.getElementById('customerDashboard').classList.remove('active');
    document.getElementById('loginForm').reset();
    showToast('Logged out successfully');
}

// Sidebar Navigation
document.querySelectorAll('.sidebar-menu li').forEach(item => {
    item.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        
        // Update active menu item
        this.parentElement.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        const container = this.closest('.dashboard');
        container.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        container.querySelector(`#${section}`).classList.add('active');
    });
});

// Admin Functions
function loadAdminData() {
    updateAdminStats();
    loadCustomersTable();
    loadBillsTable();
    document.getElementById('pricePerMeter').value = pricePerMeter;
}

function updateAdminStats() {
    document.getElementById('totalCustomers').textContent = formatNumber(customers.length);
    document.getElementById('totalBills').textContent = formatNumber(bills.length);
    document.getElementById('paidBills').textContent = formatNumber(bills.filter(b => b.paid).length);
    document.getElementById('unpaidBills').textContent = formatNumber(bills.filter(b => !b.paid).length);
}

function loadCustomersTable() {
    const tbody = document.querySelector('#customersTable tbody');
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const unpaidCount = bills.filter(b => b.customerId === customer.id && !b.paid).length;
        const row = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td><span class="badge ${unpaidCount > 0 ? 'unpaid' : 'paid'}">${unpaidCount}</span></td>
                <td>
                    <button class="btn-small btn-primary" onclick="editCustomer('${customer.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-danger" onclick="deleteCustomer('${customer.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function loadBillsTable() {
    const tbody = document.querySelector('#billsTable tbody');
    tbody.innerHTML = '';
    
    bills.forEach(bill => {
        const customer = customers.find(c => c.id === bill.customerId);
        const row = `
            <tr>
                <td>${bill.id}</td>
                <td>${customer ? customer.name : 'Unknown'}</td>
                <td>${formatNumber(bill.meters)}</td>
                <td>${formatRWF(bill.amount)}</td>
                <td><span class="badge ${bill.paid ? 'paid' : 'unpaid'}">
                    <i class="fas fa-${bill.paid ? 'check-circle' : 'exclamation-circle'}"></i> 
                    ${bill.paid ? 'Paid' : 'Unpaid'}
                </span></td>
                <td>${new Date(bill.date).toLocaleDateString()}</td>
                <td>
                    ${!bill.paid ? `<button class="btn-small btn-success" onclick="markAsPaid('${bill.id}')">
                        <i class="fas fa-check"></i> Mark Paid
                    </button>` : ''}
                    <button class="btn-small btn-danger" onclick="deleteBill('${bill.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Customer Modal Functions
function openAddCustomerModal() {
    document.getElementById('customerModalTitle').innerHTML = '<i class="fas fa-user-plus"></i> Add New Customer';
    document.getElementById('customerFormBtn').innerHTML = '<i class="fas fa-save"></i> Add Customer';
    document.getElementById('addCustomerForm').reset();
    document.getElementById('editCustomerId').value = '';
    document.getElementById('addCustomerModal').classList.add('show');
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        document.getElementById('customerModalTitle').innerHTML = '<i class="fas fa-user-edit"></i> Edit Customer';
        document.getElementById('customerFormBtn').innerHTML = '<i class="fas fa-save"></i> Update Customer';
        document.getElementById('editCustomerId').value = customer.id;
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerPhone').value = customer.phone;
        document.getElementById('customerPassword').value = customer.password;
        document.getElementById('addCustomerModal').classList.add('show');
    }
}

document.getElementById('addCustomerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editCustomerId').value;
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const password = document.getElementById('customerPassword').value;

    if (editId) {
        // Edit existing customer
        const customer = customers.find(c => c.id === editId);
        customer.name = name;
        customer.phone = phone;
        customer.password = password;
        showToast('Customer updated successfully!');
    } else {
        // Add new customer
        const newCustomer = {
            id: 'CUST' + Date.now(),
            name,
            phone,
            password
        };
        customers.push(newCustomer);
        
        // Show credentials modal
        document.getElementById('credCustomerId').textContent = newCustomer.id;
        document.getElementById('credPassword').textContent = password;
        document.getElementById('credentialsModal').classList.add('show');
    }

    localStorage.setItem('customers', JSON.stringify(customers));
    closeModal('addCustomerModal');
    loadCustomersTable();
    updateAdminStats();
});

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer? All associated bills will also be deleted.')) {
        customers = customers.filter(c => c.id !== customerId);
        bills = bills.filter(b => b.customerId !== customerId);
        localStorage.setItem('customers', JSON.stringify(customers));
        localStorage.setItem('bills', JSON.stringify(bills));
        loadCustomersTable();
        loadBillsTable();
        updateAdminStats();
        showToast('Customer deleted successfully!');
    }
}

// Bill Modal Functions
function openAddBillModal() {
    document.getElementById('billModalTitle').innerHTML = '<i class="fas fa-plus"></i> Add New Bill';
    document.getElementById('billFormBtn').innerHTML = '<i class="fas fa-save"></i> Add Bill';
    document.getElementById('addBillForm').reset();
    document.getElementById('editBillId').value = '';
    
    // Populate customer dropdown
    const select = document.getElementById('billCustomer');
    select.innerHTML = '<option value="">Select a customer</option>';
    customers.forEach(customer => {
        select.innerHTML += `<option value="${customer.id}">${customer.name} (${customer.id})</option>`;
    });
    
    document.getElementById('addBillModal').classList.add('show');
}

// Auto-calculate bill amount with RWF formatting
document.getElementById('metersUsed').addEventListener('input', (e) => {
    const meters = parseFloat(e.target.value) || 0;
    const amount = meters * pricePerMeter;
    document.getElementById('billAmount').value = formatRWF(amount);
});

document.getElementById('addBillForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const customerId = document.getElementById('billCustomer').value;
    const meters = parseFloat(document.getElementById('metersUsed').value);
    const amount = meters * pricePerMeter;

    const newBill = {
        id: 'BILL' + Date.now(),
        customerId,
        meters,
        amount,
        paid: false,
        date: new Date().toISOString()
    };

    bills.push(newBill);
    localStorage.setItem('bills', JSON.stringify(bills));
    closeModal('addBillModal');
    loadBillsTable();
    updateAdminStats();
    showToast('Bill added successfully!');
});

function markAsPaid(billId) {
    const bill = bills.find(b => b.id === billId);
    if (bill) {
        bill.paid = true;
        localStorage.setItem('bills', JSON.stringify(bills));
        loadBillsTable();
        updateAdminStats();
        if (currentUser.type === 'customer') {
            loadCustomerData();
        }
        showToast('Bill marked as paid!');
    }
}

function deleteBill(billId) {
    if (confirm('Are you sure you want to delete this bill?')) {
        bills = bills.filter(b => b.id !== billId);
        localStorage.setItem('bills', JSON.stringify(bills));
        loadBillsTable();
        updateAdminStats();
        showToast('Bill deleted successfully!');
    }
}

// Settings Functions
function updatePrice() {
    const newPrice = parseFloat(document.getElementById('pricePerMeter').value);
    if (newPrice > 0) {
        pricePerMeter = newPrice;
        localStorage.setItem('pricePerMeter', pricePerMeter);
        showToast('Price updated successfully!');
    } else {
        showToast('Please enter a valid price', 'error');
    }
}

// Customer Dashboard Functions
function loadCustomerData() {
    const customer = currentUser.data;
    document.getElementById('displayCustomerName').textContent = customer.name;
    document.getElementById('custId').textContent = customer.id;
    
    const customerBills = bills.filter(b => b.customerId === customer.id);
    const unpaidBills = customerBills.filter(b => !b.paid);
    const totalDue = unpaidBills.reduce((sum, bill) => sum + bill.amount, 0);
    
    document.getElementById('custTotalBills').textContent = formatNumber(customerBills.length);
    document.getElementById('custUnpaidBills').textContent = formatNumber(unpaidBills.length);
    document.getElementById('custTotalDue').textContent = formatRWF(totalDue);
    
    loadCustomerBillsTable();
}

function loadCustomerBillsTable() {
    const tbody = document.querySelector('#customerBillsTable tbody');
    tbody.innerHTML = '';
    
    const customerBills = bills.filter(b => b.customerId === currentUser.data.id);
    
    customerBills.forEach(bill => {
        const row = `
            <tr>
                <td>${bill.id}</td>
                <td>${formatNumber(bill.meters)}</td>
                <td>${formatRWF(bill.amount)}</td>
                <td><span class="badge ${bill.paid ? 'paid' : 'unpaid'}">
                    <i class="fas fa-${bill.paid ? 'check-circle' : 'exclamation-circle'}"></i>
                    ${bill.paid ? 'Paid' : 'Unpaid'}
                </span></td>
                <td>${new Date(bill.date).toLocaleDateString()}</td>
                <td>
                    ${!bill.paid ? `<button class="btn-small btn-success" onclick="markAsPaid('${bill.id}')">
                        <i class="fas fa-check"></i> Pay Now
                    </button>` : '<span style="color: #10b981;"><i class="fas fa-check-circle"></i> Paid</span>'}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Copy Credentials Function
function copyCredentials() {
    const customerId = document.getElementById('credCustomerId').textContent;
    const password = document.getElementById('credPassword').textContent;
    const text = `Customer ID: ${customerId}\nPassword: ${password}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('Credentials copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy credentials', 'error');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && currentUser !== 'null') {
        const user = JSON.parse(currentUser);
        showDashboard(user.type);
    }
});
