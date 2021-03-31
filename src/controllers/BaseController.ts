import { Response, Request, NextFunction, Router } from 'express';
import upload from '../middlewares/imageUploader';


export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface IRoute {
    path: string;
    method: Methods;
    handler: (req: Request, res: Response, next: NextFunction) => any;
    localMiddleware: ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => void)[];
}

export default abstract class BaseController {

    public router: Router = Router();
    public abstract path: string;
    protected abstract readonly routes: Array<IRoute> = [];

    public setRoutes = (): Router => {
        for (const route of this.routes) {

            switch (route.method) {
                case 'GET':
                    this.router.get(route.path, route.localMiddleware, route.handler);
                    break;
                case 'POST':
                    this.router.post(route.path, route.localMiddleware, route.handler);
                    break;
                case 'PUT':
                    this.router.put(route.path, route.localMiddleware, route.handler);
                    break;
                case 'DELETE':
                    this.router.delete(route.path, route.localMiddleware, route.handler);
                    break;
                default:
            }
        }
        return this.router;
    };
}
