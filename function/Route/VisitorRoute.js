import {createVisitor , verifyVisitorOTP , getVisitor , getVisitorById, deleteVisitor } from "../controller/visitor.js";
import Router from 'express'
import verifyToken from "../Middleware/authMiddleware.js";
//import verifyToken from "../Middleware/authMiddleware.js";
import  { checkPermission } from '../Middleware/permission.js'

const router = Router()


router.post('/',verifyToken,checkPermission('create','visitor'),createVisitor)
router.put('/',verifyToken,verifyVisitorOTP)
router.get('/',getVisitor)
router.get('/:id',getVisitorById)
router.delete('/:id',deleteVisitor)

export default router