import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { Session } from './utils/session';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// * Session implementations
const session = new Session(app);
session.init();

// * Basic requests

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
