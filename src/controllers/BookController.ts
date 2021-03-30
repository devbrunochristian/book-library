import authenticateJWT from '../middlewares/authenticateJWT';
import BookService from '../services/bookService';
import BaseController, { Methods } from './BaseController';



export default class BookController extends BaseController {
    path = '/books';
    routes = [

        {
            path: '/',
            method: Methods.GET,
            handler: BookService.getBooks,
            localMiddleware: [authenticateJWT],
        },
        {
            path: '/:id',
            method: Methods.GET,
            handler: BookService.getBook,
            localMiddleware: [authenticateJWT],
        },
        {
            path: '/',
            method: Methods.POST,
            handler: BookService.createBook,
            localMiddleware: [authenticateJWT],
        },
        {
            path: '/:id',
            method: Methods.DELETE,
            handler: BookService.deleteBook,
            localMiddleware: [authenticateJWT],
        },
        {
            path: '/:id',
            method: Methods.PUT,
            handler: BookService.updateBook,
            localMiddleware: [authenticateJWT],
        }



    ];
    constructor() {
        super();
    }
}
