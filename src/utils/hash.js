import bcrypt from 'bcrypt';

const hashPassword = (planPassword, salt = 10) => {
  return bcrypt.hashSync(planPassword, salt);
};

const comparePassword = (planPassword, hash) => {
  return bcrypt.compareSync(planPassword, hash);
};

export { hashPassword, comparePassword };
