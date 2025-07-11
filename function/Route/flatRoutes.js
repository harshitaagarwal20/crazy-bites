import { createflat, deleteflat } from "../controller/controlFlat.js";
import assignFlatToUser, { getFlatUser, getFlatUserById } from "../controller/FlatUser.js";
import { getUserByFlatId,getUserByFlat } from "../controller/controlFlat.js";
import verifyToken from "../Middleware/authMiddleware.js";
import Router from 'express'

const router = Router()

router.post('/',verifyToken,createflat)
router.post('/assign',verifyToken,assignFlatToUser)
router.get('/assign',verifyToken,getFlatUser)
router.get('/assign/:id',verifyToken,getFlatUserById)
router.get('/',getUserByFlat)
router.get('/:id',verifyToken, getUserByFlatId);
router.delete('/:id',verifyToken, deleteflat);

export default router