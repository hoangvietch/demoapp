import { Router } from 'express';
import controller from '../controllers/user.controller';
import verifyToken from '../middlewares/verifyToken.middleware';
import userValidator from '../validators/user.validator';

const router = Router();

router.use(verifyToken);
router.get('/', controller.getUsers);
router.post('/add', userValidator.addValidator(), controller.addUser);
router.put('/edit/:userId', controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export default router;
