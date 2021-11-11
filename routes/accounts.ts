
import express from 'express';
import controller from '../controller/accounts';
const router = express.Router();

router.get('/api/accounts', controller.getAccounts);
router.get('/api/accounts/:id', controller.getAccountsById);
router.post('/api/accounts', controller.createAccount);
// router.put('/accounts/:id', controller.updateAccount);
// router.delete('/accounts/:id', controller.deleteAccount);

export default router;
