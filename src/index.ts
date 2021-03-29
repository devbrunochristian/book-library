import Server from './Server';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import { json, RequestHandler, urlencoded } from 'express';
import morgan from 'morgan';
import BaseController from './controllers/BaseController';
import express from 'express';
dotenv.config();

export const app = express();

const server = new Server(app, Number(process.env.PORT));

const controllers: Array<BaseController> = [new UserController()];

const globalMiddleware: Array<RequestHandler> = [
    json(),
    urlencoded({ extended: false }),
    morgan('tiny'),
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
        server.loadGlobalMiddleware(globalMiddleware);
        server.loadControllers(controllers);
        server.run();
    });

export default server;
