import { createSociety,deleteSociety,UpdateSociety,getSociety,getSocietyById } from "../controller/SocietyControl.js";

import verifyToken from "../Middleware/authMiddleware.js";
//import {checkRole} from "../Middleware/permission.js";
import Router from 'express'

const router = Router()

router.post('/',verifyToken,createSociety)
router.put('/',verifyToken,UpdateSociety)
router.get('/',verifyToken,getSociety)
router.get('/:id',verifyToken, getSocietyById);
router.delete('/:id',verifyToken, deleteSociety);


export default router