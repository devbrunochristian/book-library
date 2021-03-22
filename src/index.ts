import App from './App'
import dotenv from 'dotenv'
import AppInit from './interfaces/AppInit'
dotenv.config()

const appInit: AppInit = {
    PORT: process.env.PORT
}

const app = new App(appInit)

app.start()

