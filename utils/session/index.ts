import { Express, Request, Response } from 'express';
import session from 'express-session';

let RedisStore = require('connect-redis')(session);
import { createClient } from 'redis';
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

export class Session {
  private _app;
  constructor(app: Express) {
    this._app = app;
  }

  init() {
    // INIT SESSION

    this._app.use(
      session({
        secret: 'keyboard cat',
        // * Auto re-save cookie, token when it expired
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true, maxAge: 5 * 60 * 1000 },
        // store a session to Redis
        store: new RedisStore({ client: redisClient }),
      }),
    );

    // GET EXISTENT SESSION

    this._app.get('/get-session', (req: Request, res: Response) => {
      res.send(req.session);
    });

    // SET A NEW SESSION

    this._app.get('/set-session', (req: any, res: Response) => {
      req.session.user = {
        username: 'Steve Truong',
        age: 25,
      };
      res.send('Session was set');
    });
  }
}
