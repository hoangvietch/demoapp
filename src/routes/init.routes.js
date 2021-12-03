import errorHandle from '../middlewares/error.middleware';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

export default function initRoutes(app) {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use(errorHandle);
}
