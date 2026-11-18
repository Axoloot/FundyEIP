import redisConnector from 'connect-redis';
import expressSession from 'express-session';
import redisClient from '../redis';

const Connector = redisConnector(expressSession);

const sessionMiddleware = expressSession({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
  store: new Connector({ client: redisClient }),
});

export default sessionMiddleware;
