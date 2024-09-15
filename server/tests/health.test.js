const request = require('supertest');
const app = require('../index'); // Import your express app


describe('Health Check', () => {
  it('should return 200 OK and server running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
