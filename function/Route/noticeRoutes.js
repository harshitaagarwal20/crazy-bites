import { updateComplain } from "../controller/Complain.js";
import { createNotice,deleteNotice,getNotice,getNoticeById, updateNotice } from "../controller/notice.js";
import verifyToken from "../Middleware/authMiddleware.js";
import Router from 'express'

const router = Router()


router.post('/',verifyToken,createNotice)
router.get('/',verifyToken,getNotice)
router.get('/:id',verifyToken,getNoticeById)
router.put('/:id',verifyToken,updateNotice)
router.delete('/:id',verifyToken,deleteNotice)

export default router