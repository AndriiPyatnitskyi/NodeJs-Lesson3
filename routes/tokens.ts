import express from 'express';
import controller from '../controller/tokens';
const tokenRouter = express.Router();

tokenRouter.get('/api/tokens', controller.getTokens);
// router.get('/api/accounts/:id', controller.getAccountsById);
// router.post('/api/accounts', controller.createAccount);
// router.put('/api/accounts/:id', controller.updateAccount);
// router.delete('/api/accounts/:id', controller.deleteAccount);

export default tokenRouter;
