
import express from 'express';
import controller from '../controller/accounts';
const router = express.Router();

router.get('/api/accounts', controller.getAccounts);
router.get('/api/accounts/:id', controller.getAccountsById);
router.post('/api/accounts', controller.createAccount);
router.put('/api/accounts/:id', controller.updateAccount);
router.delete('/api/accounts/:id', controller.deleteAccount);

export default router;
