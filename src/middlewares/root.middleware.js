import { json, urlencoded } from 'express';
import cors from 'cors';
// import morgan from 'morgan';
import helmet from 'helmet';
import logger from '../utils/logger';

const setupRootMiddleware = app => {
  app.use(cors({ origin: '*' }));
  app.use(helmet());
  app.disable('x-powered-by');
  app.use(urlencoded({ extended: false }));
  app.use(
    json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  app.set('trust proxy', true);
  if (process.env !== 'production') {
    // app.use(morgan('short'));
    app.use(logger);
  }
};

export default setupRootMiddleware;
