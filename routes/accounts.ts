
import express from 'express';
import controller from '../controller/accounts';
const router = express.Router();

router.get('/accounts', controller.getAccounts);
// accountRouter.get('/accounts/:id', controller.getAccount);
// accountRouter.put('/accounts/:id', controller.updateAccount);
// accountRouter.delete('/accounts/:id', controller.deleteAccount);
// accountRouter.post('/accounts', controller.addAccount);

export default router;
