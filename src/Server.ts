/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Application, RequestHandler } from 'express';
import BaseController from './controllers/BaseController';
import upload from './middlewares/imageUploader';

export default class Server {

  constructor(private app: Application, private readonly port: number) {

    // app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    //   const file = req.file
    //   if (!file) {
    //     res.status(404).json({ error: 'File not found' })
    //   }
    //   try {
    //     res.send(file)


    //   } catch (error) {
    //     res.status(500).json({ error })

    //   }



    // })
  }

  run() {
    return this.app.listen(this.port, () => {
      console.log(`Up and running on port ${this.port}`);
    });
  }

  loadGlobalMiddleware(middleware: Array<RequestHandler>): void {
    middleware.forEach((mw) => {
      this.app.use(mw);
    });
  }

  loadControllers(controllers: Array<BaseController>): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }

  async initDatabase(): Promise<void> {

    mongoose
      .connect(process.env.MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.log(`Successfully connected to ${process.env.MONGO_URL}`);
      })
      .catch(error => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });

  }
}


