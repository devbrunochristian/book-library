import UserService from '../services/userService';
import BaseController, { Methods } from './BaseController';

export default class UserController extends BaseController {
    path = '/auth';
    routes = [

        {
            path: '/register',
            method: Methods.POST,
            handler: UserService.register,
            localMiddleware: [],
        },
        {
            path: '/login',
            method: Methods.POST,
            handler: UserService.login,
            localMiddleware: [],
        }


    ];
    constructor() {
        super();
    }
}
