import fs from 'fs';
import path from 'path';
import Jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import userInfrastructure from '../infrastructures/user.infrastructure';
import { comparePassword, hashPassword } from '../utils/hash';

const controller = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const filter = {
        condition: { email },
        limit: 1,
      };
      const user = await userInfrastructure.get(filter);
      if (user.length === 0) {
        return res.json({ msg: 'User not found', code: 90010 });
      }
      const userPssHash = user[0].password;
      const userEmail = user[0].email;
      if (!comparePassword(password, userPssHash)) {
        return res.json({ msg: 'Username or password wrong', code: 90009 });
      }
      const myKey = fs.readFileSync(path.resolve('private.key'), 'utf8');
      const token = Jwt.sign(
        { email: userEmail, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
        myKey,
        { algorithm: 'HS256' },
      );
      res.json({ msg: 'OK', code: 90011, token });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const data = req.body;
      const objectUser = {
        ...data,
        password: hashPassword(data.password, 10),
      };
      const userCreated = await userInfrastructure.post({ objectUser });
      const { password, ...y } = userCreated.toObject();
      res.json({ msg: 'OK', code: 90001, user: y });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
