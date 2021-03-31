import { app } from '..';
import request from 'supertest';
import { UserInterface } from '../Models/userModel';

describe('User Service ', () => {

  let createdUser: UserInterface;

  describe("POST /auth/register - UserService.register:", () => {
    it('Should create new user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'Nick', email: `user.test.${Math.random()}@mail.com`, password: '2233222' });
      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('name', 'Nick');
      createdUser = response.body.user
    });

    it('Shouldn\'t create a user without a name', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'nick@email.com', password: '22332222' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Name is required!')
    });


    it('Shouldn\'t create a user without a email', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'nick', password: '223322222' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email is required!')
    });


    it('Shouldn\'t create a user without a password', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'nick', email: 'nick@email.com', });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Password is required!')
    });

    it('Should password length be greater than 6 characters', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'nick', email: 'nick@email.com', password: '12345' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Password must have at minimum 6 characters!')
    })


    it('Shouldn\'t create a user with duplicated email', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'nick', email: createdUser.email, password: '23457222' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email already registred!')
    });

  })

  describe("POST /auth/login - UserService.login:", () => {
    it('Should return access Token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: "teste@email.com", password: 'teste1234' });
      expect(response.status).toBe(200);
      expect(response.body.accessToken).not.toBeNull()
    })

    it('Shouldn\'t login without email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ password: 'teste1234' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email is required!')
    })

    it('Shouldn\'t login without password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: "teste@email.com" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Password is required!')
    })

    it('Shouldn\'t login with wrong password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: "teste@email.com", password: 'teste123' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Password is wrong!')
    })


    it('Shouldn\'t login with wrong email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: "teste22@email.com", password: 'teste1234' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('User not found!')
    })

  })

});


