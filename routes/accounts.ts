import express from 'express';
import controller from '../controller/accounts';
import {Role} from "../model/account";

const permit = require("../middleware/auth");
const accountRouter = express.Router();

accountRouter.get('/api/accounts', permit(new Array(Role.USER, Role.ADMIN)), controller.getAccounts);
accountRouter.get('/api/accounts/:id', controller.getAccountById);
accountRouter.post('/api/accounts', controller.createAccount);
accountRouter.put('/api/accounts/:id', controller.updateAccount);
accountRouter.delete('/api/accounts/:id', controller.deleteAccount);
accountRouter.get('/api/accounts/:id/tokens', controller.getAccountTokensByAccountId);
accountRouter.post('/api/accounts/:id/tokens', controller.createAccountToken);
accountRouter.put('/api/accounts/:id/tokens', controller.updateAccountToken);
accountRouter.delete('/api/accounts/:id/tokens', controller.deleteAccountToken);

export default accountRouter;
