import mongoose from 'mongoose';
import { MONGODB_URL } from '../utils/constants';

console.log('MONGODB_URL', MONGODB_URL);
const options = {
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectWithRetry = () =>
  mongoose.connect(MONGODB_URL, options, err => {
    if (err) {
      console.error(
        'Failed to connect to mongo on startup - retrying in 5 sec',
        err,
      );
      setTimeout(connectWithRetry, 5000);
    }
  });

connectWithRetry();

export default mongoose;
