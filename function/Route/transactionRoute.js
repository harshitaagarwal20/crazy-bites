
//import verifyToken from "../Middleware/authMiddleware.js";
import Router from 'express'
import { createTransaction, deleteTransaction, getTransaction, getTransactionById, updateTransaction,} from "../controller/transaction.js";
import verifyToken from '../Middleware/authMiddleware.js';
//import { checkRole } from '../Middleware/permission.js';

const router = Router()

router.post('/',verifyToken,createTransaction)
router.put('/',verifyToken,updateTransaction)
router.get('/',verifyToken,getTransaction)
router.get('/:id',verifyToken, getTransactionById);
router.delete('/:id',verifyToken, deleteTransaction);


export default router