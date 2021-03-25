import UserService from '../services/userService';
import BaseController, { Methods } from './BaseController';

export default class UserController extends BaseController {
    path = '/users';
    routes = [
        {
            path: '/',
            method: Methods.GET,
            handler: UserService.getUsers,
            localMiddleware: [],
        },

        {
            path: '/',
            method: Methods.POST,
            handler: UserService.createUser,
            localMiddleware: [],
        },
    ];
    constructor() {
        super();
    }
}
