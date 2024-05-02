const request = require('supertest');
const app = require('./app');
const { connectDB } = require('./config/db');

jest.setTimeout(10000);

describe('Authentication', () => {
  let server;

  beforeAll(async () => {
    await connectDB(); 
    server = await app.listen(0);
  });

  afterAll(async () => {
    await server.close();
  });

  it('should login a user', async () => {
    const response = await request(server)
        .post('/login')
        .send({
          username: 'test',
          password: '123',
        });
    expect(response.status).toBe(200);
  }, 10000); 

});
