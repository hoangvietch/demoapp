import { validationResult } from 'express-validator';
import userInfrastructure from '../infrastructures/user.infrastructure';
import { hashPassword } from '../utils/hash';

const controller = {
  getUsers: async (req, res, next) => {
    try {
      const { skip, limit, fields } = req.query;
      let fieldQueries;
      if (fields) {
        const arFieldQueries = String(fields).trim().split(',');
        fieldQueries = arFieldQueries.filter(field => field !== 'password');
      }
      const filter = {
        skip: skip || 0,
        limit: limit || 10,
        fields: fieldQueries || ['-password'],
      };
      const users = await userInfrastructure.get(filter);
      res.json({ msg: 'OK', users });
    } catch (error) {
      next(error);
    }
  },
  addUser: async (req, res, next) => {
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
  updateUser: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { userId } = req.params;
      const data = req.body;
      const filter = {
        _id: userId,
        objectUser: {
          first_name: data.first_name,
          last_name: data.last_name,
          birthday: data.birthday,
          phone: data.phone,
        },
        fields: ['-password'],
        newDocument: true,
      };
      const userUpdated = await userInfrastructure.update(filter);
      res.json({ msg: 'OK', code: 90001, user: userUpdated });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log('userId', userId);
      await userInfrastructure.delete({ _id: userId });
      res.json({ msg: 'OK', code: 90001 });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
