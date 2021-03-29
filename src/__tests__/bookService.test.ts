import { app } from '..';
import request from 'supertest';
import { BookInterface } from '../Models/bookModel';

let mockBook: BookInterface

describe('Book Service ', () => {

    describe("POST /books - BookService.createBook:", () => {
        it('Should create a new book', async () => {
            const response = await request(app)
                .post('/books')
                .send({
                    title: "Rich Dad Poor Dad",
                    category: "finance",
                    author: " Robert Kiyosaki",
                })
            expect(response.status).toBe(201);
            expect(response.body.book).toHaveProperty('title', 'Rich Dad Poor Dad');
            mockBook = response.body.book
        });

        it('Shouldn\'t create a new book without title', async () => {
            const response = await request(app)
                .post('/books')
                .send({
                    category: "finance",
                    author: " Robert Kiyosaki",
                })
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Title is required!');
        });

        it('Shouldn\'t create a new book without author', async () => {
            const response = await request(app)
                .post('/books')
                .send({
                    title: "Rich Dad Poor Dad",
                    category: "finance",
                })
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Author is required!');
        });


        it('Shouldn\'t create a new book without category', async () => {
            const response = await request(app)
                .post('/books')
                .send({
                    title: "Rich Dad Poor Dad",
                    author: " Robert Kiyosaki",
                })
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Category is required!');
        });
    })


    describe("GET /books - BookService.getBooks:", () => {
        it('Should return all books', async () => {
            const response = await request(app)
                .get('/books')
            expect(response.status).toBe(200);
            expect(response.body.books.length).toBeGreaterThanOrEqual(0)
        });


    })

    describe("GET /books - BookService.getBook:", () => {
        it('Should return a book', async () => {
            const response = await request(app)
                .get(`/books/${mockBook._id}`)
            expect(response.status).toBe(200);
            expect(response.body.book[0]).toHaveProperty('title', mockBook.title)
        });
    })

    describe('PUT /books - BookService.updateBooks:', async () => {

        it('Shouldn\'t update a book if ID param doesn\'t exist ', async () => {
            const response = await request(app)
                .put(`/books/60622455c1a7b00d067ab98a`)
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
            expect(response.status).toBe(200);
            expect(response.body.book).toHaveProperty('title', 'The 48 Laws of Power')
        });

    })


    describe('DELETE /books - BookService.deleteBooks:', async () => {

        it('Shouldn\'t delete a book if ID param doesn\'t exist ', async () => {
            const response = await request(app)
                .delete(`/books/60622455c1a7b00d067ab98a`)
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Book not found!')
        });
        it('Should delete a book', async () => {
            const response = await request(app)
                .delete(`/books/${mockBook._id}`)
            expect(response.status).toBe(200);
            expect(response.body.response).toHaveProperty('title', 'The 48 Laws of Power')
        });

    })





});


