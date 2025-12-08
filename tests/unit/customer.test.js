const assert = require('assert');

// Mock data
let customers = [];
let bills = [];

// Helper functions to test
function formatRWF(amount) {
    return 'RWF ' + Number(amount).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

function addCustomer(name, phone, password) {
    const customer = {
        id: 'CUST' + Date.now(),
        name,
        phone,
        password
    };
    customers.push(customer);
    return customer;
}

function calculateBill(meters, pricePerMeter) {
    return meters * pricePerMeter;
}

// Test Suite
describe('Customer Management Tests', () => {
    beforeEach(() => {
        customers = [];
        bills = [];
    });

    describe('formatRWF', () => {
        it('should format amount with RWF prefix', () => {
            assert.strictEqual(formatRWF(1000), 'RWF 1,000');
        });

        it('should handle decimal amounts', () => {
            assert.strictEqual(formatRWF(1000.50), 'RWF 1,000.5');
        });

        it('should handle large amounts', () => {
            assert.strictEqual(formatRWF(1000000), 'RWF 1,000,000');
        });
    });

    describe('addCustomer', () => {
        it('should create customer with valid data', () => {
            const customer = addCustomer('John Doe', '0781234567', 'pass123');
            assert.strictEqual(customer.name, 'John Doe');
            assert.strictEqual(customer.phone, '0781234567');
            assert.ok(customer.id.startsWith('CUST'));
        });

        it('should add customer to array', () => {
            addCustomer('Jane Doe', '0781234568', 'pass456');
            assert.strictEqual(customers.length, 1);
        });
    });

    describe('calculateBill', () => {
        it('should calculate bill correctly', () => {
            const amount = calculateBill(100, 500);
            assert.strictEqual(amount, 50000);
        });

        it('should handle decimal meters', () => {
            const amount = calculateBill(10.5, 500);
            assert.strictEqual(amount, 5250);
        });

        it('should return 0 for zero meters', () => {
            const amount = calculateBill(0, 500);
            assert.strictEqual(amount, 0);
        });
    });
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatRWF,
        addCustomer,
        calculateBill
    };
}
