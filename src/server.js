import express from 'express';
import { PORT } from './utils/constants';
import initRoutes from './routes/init.routes';
import setupRootMiddleware from './middlewares/root.middleware';
import setupSwaggerConnection from './services/swagger.service';

const bootstrap = () => {
  const app = express();
  setupRootMiddleware(app);
  setupSwaggerConnection(app);
  initRoutes(app);
  app.listen(PORT, () => {
    console.log(`\n\nStarted at: http://localhost:${PORT} \n\n`);
  });
};

bootstrap();
