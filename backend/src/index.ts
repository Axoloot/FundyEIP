import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { collectDefaultMetrics, register, Gauge } from 'prom-client';

import routes from './routes';
import logger from './logger';
import logMiddleware from './middlewares/log';
import { connectToDatabase } from './database';
import transactionsCron from './transactionsCron';
import errorMiddleware from './middlewares/error';
import sessionMiddleware from './middlewares/redis';
import { notFoundMiddleware } from './middlewares/notFound';

const port = '8000';
const httpsPort = '8001';

const app = express();

/*
const register = new Registry()
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'fundy-beta-back'
})

collectDefaultMetrics({ register })
 */

collectDefaultMetrics()

app.get('/metrics', async (_req: any, res: any) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

const privateKey = fs.readFileSync('./https/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./https/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.set('trust proxy', true);

app.use(logMiddleware);
app.use(helmet());
app.use(bodyParser.json(
  {limit: '50mb'}
));

const whitelistedHosts = [
  'https://fundy.cf',
  'https://dashboard.fundy.cf',
  'EXPOAPP',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://partner-dashboard-qqqii.ondigitalocean.app',
  'http://partner-dashboard-qqqii.ondigitalocean.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (whitelistedHosts.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(whitelistedHosts, origin);
      // callback(new Error('Not allowed by CORS'))
      // SI PB DE CORS: COMMENTER AU DESSUS ET DECOMMENTER EN DESSOUS
      callback(null, true)
    }
  },
  methods: ['PATCH', 'POST', 'PUT', 'DELETE', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

/*
app.use(function (_req: any, res: any, next) {
  res.header('Access-Control-Allow-Origin', ['https://fundy-dashboard.vercel.app', 'http://localhost:3000', 'http://localhost:3001']);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
 */

app.use(sessionMiddleware);

transactionsCron();

app.use(routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

connectToDatabase().then(() => {
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(port, () => {
    logger.info(`server is listening on port ${port}`);
  });
  httpsServer.listen(httpsPort, () => {
    logger.info(`server is listening on port ${httpsPort}`);
  });
}).catch(() => {
  process.exit(1);
});

