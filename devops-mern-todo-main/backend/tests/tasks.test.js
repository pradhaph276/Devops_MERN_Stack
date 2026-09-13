const request = require('supertest');
const mongoose = require('mongoose');

const { app, startServer, getServer } = require('../index');

let server;

describe('GET /api/tasks', () => {

  beforeAll(async () => {
    server = await startServer();
  });

  it('should return 200 OK', async () => {
    const res = await request(app)
      .get('/api/tasks');

    expect(res.statusCode).toBe(200);
  });

  it('should return object with tasks property', async () => {
    const res = await request(app)
      .get('/api/tasks');

    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('tasks');

    console.log(res.body.tasks, 'DATA SEEDED');
  });

  afterAll(async () => {
    await mongoose.connection.close();

    if (server) {
      await new Promise((resolve) => {
        server.close(resolve);
      });
    }
  });
});