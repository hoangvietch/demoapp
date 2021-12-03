import { check } from 'express-validator';

const userValidator = {
  addValidator: () => [
    check('email')
      .isEmail()
      .withMessage('Email invalid')
      .notEmpty()
      .withMessage('Email cannot be null'),
    check('phone')
      .isMobilePhone('vi-VN')
      .withMessage('Phone number must be region vi-VN')
      .isLength({ min: 9, max: 13 })
      .withMessage('Phone number invalid length'),
    check('password')
      .isLength({ min: 6, max: 10 })
      .withMessage('Password must be 6 - 10 chars')
      .notEmpty()
      .withMessage('Password cannot be null'),
  ],
  updateValidator: () => [
    check('phone').isMobilePhone('vi-VN').isLength({ min: 9, max: 13 }),
    // check bla
  ],
};

export default userValidator;
