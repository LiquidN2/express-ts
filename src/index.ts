import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';
const controllerRouter = AppRouter.getInstance();

import './controllers/rootController';
import './controllers/LoginController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['secretkey'] }));

app.use(controllerRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void =>
  console.log(`👂👂👂 Listening on port ${PORT} 👂👂👂`)
);
