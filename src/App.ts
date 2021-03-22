import express from 'express';
import AppInit from './interfaces/AppInit';

export default class App {
    private app = express();
    private PORT

    constructor(appInit: AppInit) {
        this.PORT = appInit.PORT
    }

    start(): void {
        this.app.listen(this.PORT,
            () => console.log(`Server running on port ${this.PORT}`));
    }
}
