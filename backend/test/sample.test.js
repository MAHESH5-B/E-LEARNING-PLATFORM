const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Backend sample tests', () => {
  it('should return a welcome message from GET /', async () => {
    const response = await request(app).get('/');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'E-Learning Platform API');
  });
});
