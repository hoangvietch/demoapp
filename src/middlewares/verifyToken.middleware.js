import fs from 'fs';
import path from 'path';
import Jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    if (!authorization) {
      return res.json({ msg: 'Missing token in request', code: 20023 });
    }
    const tokenInHeader = authorization.split(' ')[1];
    const myKey = fs.readFileSync(path.resolve('private.key'), 'utf8');
    const decoded = Jwt.verify(tokenInHeader, myKey);
    if (decoded) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
