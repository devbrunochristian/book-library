import { app } from '..';
import request from 'supertest';



describe('GET /users', () => {
  it('Responds with json', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.users[0]).toHaveProperty('name', 'bruno');
  });
});

describe('POST /users', () => {
  it('Should create new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Nick', age: 0 });
    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('name', 'Nick');
  });
});
