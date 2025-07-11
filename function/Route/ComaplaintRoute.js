import { createComplaint, deleteComplainById, getAllComplaints,getComplaintById, updateComplain} from "../controller/Complain.js";
import Router from 'express'
import  verifyToken from "../Middleware/authMiddleware.js";
// import { checkRole } from "../Middleware/permission.js";
//import checkPermission from "../Middleware/permission.js";
const router = Router()


 router.post('/', verifyToken, createComplaint);
 router.get('/',getAllComplaints)
 router.get('/:id',verifyToken,getComplaintById)
 router.put('/:id',updateComplain)
 router.delete('/:id',verifyToken,deleteComplainById)

export default router