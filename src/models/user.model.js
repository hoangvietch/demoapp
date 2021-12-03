import mongoose from '../services/mongoose.sevice';

const schema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    phone: String,
    birthday: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', schema);
