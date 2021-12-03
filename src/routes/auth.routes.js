import { Router } from 'express';
import controller from '../controllers/auth.controller';
import userValidator from '../validators/user.validator';

const router = Router();

router.post('/login', controller.login);
router.post('/register', userValidator.addValidator(), controller.register);

export default router;
