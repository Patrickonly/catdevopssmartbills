const http = require('http');
const assert = require('assert');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

describe('API Integration Tests', () => {
    describe('Health Check', () => {
        it('should return 200 on /health endpoint', (done) => {
            http.get(`${BASE_URL}/health`, (res) => {
                assert.strictEqual(res.statusCode, 200);
                
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const response = JSON.parse(data);
                    assert.strictEqual(response.status, 'healthy');
                    assert.ok(response.timestamp);
                    done();
                });
            }).on('error', done);
        });
    });

    describe('Root Endpoint', () => {
        it('should return HTML on / endpoint', (done) => {
            http.get(`${BASE_URL}/`, (res) => {
                assert.strictEqual(res.statusCode, 200);
                assert.ok(res.headers['content-type'].includes('text/html'));
                done();
            }).on('error', done);
        });
    });
});
