import BookService from '../services/bookService';
import BaseController, { Methods } from './BaseController';

export default class BookController extends BaseController {
    path = '/books';
    routes = [

        {
            path: '/',
            method: Methods.GET,
            handler: BookService.getBooks,
            localMiddleware: [],
        },
        {
            path: '/:id',
            method: Methods.GET,
            handler: BookService.getBook,
            localMiddleware: [],
        },
        {
            path: '/',
            method: Methods.POST,
            handler: BookService.createBook,
            localMiddleware: [],
        },
        {
            path: '/:id',
            method: Methods.DELETE,
            handler: BookService.deleteBook,
            localMiddleware: [],
        },
        {
            path: '/:id',
            method: Methods.PUT,
            handler: BookService.updateBook,
            localMiddleware: [],
        }



    ];
    constructor() {
        super();
    }
}
