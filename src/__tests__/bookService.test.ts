import { app } from '..';
import request from 'supertest';
import path from 'path';
import { BookInterface } from '../Models/bookModel';

let mockBook: BookInterface
const testUserToken = process.env.TEST_USER_TOKEN;

describe('Book Service ', () => {

    describe("POST /books - BookService.createBook:", () => {
        it('Should create a new book', async () => {
            const response = await request(app)
                .post('/books')
                .set('Authorization', `Bearer ${testUserToken}`)
                .field('Content-Type', 'multipart/form-data')
                .field('title', "Rich Dad Poor Dad")
                .field('category', "finance")
                .field('author', " Robert Kiyosaki")
                .attach('myFile', path.join(__dirname, './mock/' + 'test.jpeg'))
            expect(response.status).toBe(201);
            expect(response.body.book).toHaveProperty('title', 'Rich Dad Poor Dad');
            mockBook = response.body.book
        });


        it('Shouldn\'t create a new book without authorization token', async () => {
            const response = await request(app)
                .post('/books')
                .field('Content-Type', 'multipart/form-data')
                .field('title', "Rich Dad Poor Dad")
                .field('category', "finance")
                .field('author', " Robert Kiyosaki")
                .attach('myFile', path.join(__dirname, './mock/' + 'test.jpeg'))

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('unauthorized');
        });

        it('Shouldn\'t create a new book without title', async () => {
            const response = await request(app)
                .post('/books')
                .set('Authorization', `Bearer ${testUserToken}`)
                .field('Content-Type', 'multipart/form-data')
                .field('category', "finance")
                .field('author', " Robert Kiyosaki")
                .attach('myFile', path.join(__dirname, './mock/' + 'test.jpeg'))

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Title is required!');
        });

        it('Shouldn\'t create a new book without author', async () => {
            const response = await request(app)
                .post('/books')
                .set('Authorization', `Bearer ${testUserToken}`)
                .field('Content-Type', 'multipart/form-data')
                .field('category', "finance")
                .field('title', "Rich Dad Poor Dad")
                .attach('myFile', path.join(__dirname, './mock/' + 'test.jpeg'))

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Author is required!');
        });


        it('Shouldn\'t create a new book without category', async () => {
            const response = await request(app)
                .post('/books')
                .set('Authorization', `Bearer ${testUserToken}`)
                .field('Content-Type', 'multipart/form-data')
                .field('title', "Rich Dad Poor Dad")
                .field('author', " Robert Kiyosaki")
                .attach('myFile', path.join(__dirname, './mock/' + 'test.jpeg'))

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Category is required!');
        });

    })


    describe("GET /books - BookService.getBooks:", () => {
        it('Should return all books', async () => {
            const response = await request(app)
                .get('/books')
                .set('Authorization', `Bearer ${testUserToken}`)
            expect(response.status).toBe(200);
            expect(response.body.books.length).toBeGreaterThanOrEqual(0)
        });


        it('Shouldn\'t return all books without authorization token', async () => {
            const response = await request(app)
                .get('/books')
            expect(response.status).toBe(401);
            expect(response.body.error).toBe('unauthorized');
        });

    })

    describe("GET /books - BookService.getBook:", () => {
        it('Should return a book', async () => {
            const response = await request(app)
                .get(`/books/${mockBook._id}`)
                .set('Authorization', `Bearer ${testUserToken}`)

            expect(response.status).toBe(200);
            expect(response.body.book[0]).toHaveProperty('title', mockBook.title)
        });

        it('Shouldn\'t return a book without authorization token', async () => {
            const response = await request(app)
                .get(`/books/${mockBook._id}`)
            expect(response.status).toBe(401);
            expect(response.body.error).toBe('unauthorized');
        });
    })

    describe('PUT /books - BookService.updateBooks:', async () => {

        it('Shouldn\'t update a book if ID param doesn\'t exist ', async () => {
            const response = await request(app)
                .put(`/books/60622455c1a7b00d067ab98a`)
                .set('Authorization', `Bearer ${testUserToken}`)

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Book not found!')
        });


        it('Should update a book', async () => {
            const response = await request(app)
                .put(`/books/${mockBook._id}`).send({
                    title: 'The 48 Laws of Power',
                    author: 'Robert Greene',
                    category: 'Self Improvement'
                })
                .set('Authorization', `Bearer ${testUserToken}`)
            expect(response.status).toBe(200);
            expect(response.body.book).toHaveProperty('title', 'The 48 Laws of Power')
        });


        it('Shouldn\'t update a book without authorization token', async () => {
            const response = await request(app)
                .put(`/books/${mockBook._id}`).send({
                    title: 'The 48 Laws of Power',
                    author: 'Robert Greene',
                    category: 'Self Improvement'
                })
            expect(response.status).toBe(401);
            expect(response.body.error).toBe('unauthorized')
        });

    })


    describe('DELETE /books - BookService.deleteBooks:', async () => {

        it('Shouldn\'t delete a book if ID param doesn\'t exist ', async () => {
            const response = await request(app)
                .delete(`/books/60622455c1a7b00d067ab98a`)
                .set('Authorization', `Bearer ${testUserToken}`)


            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Book not found!')
        });
        it('Should delete a book', async () => {
            const response = await request(app)
                .delete(`/books/${mockBook._id}`)
                .set('Authorization', `Bearer ${testUserToken}`)

            expect(response.status).toBe(200);
            expect(response.body.response).toHaveProperty('title', 'The 48 Laws of Power')
        });

        it('Shouldn\'t  delete a book without authorization token', async () => {
            const response = await request(app)
                .delete(`/books/${mockBook._id}`)
            expect(response.status).toBe(401);
            expect(response.body.error).toBe('unauthorized')
        });

    })





});


