import { createParking, deleteParking, getParking, getParkingById, updateParking } from "../controller/parking.js";
import Router from 'express'
import verifyToken from "../Middleware/authMiddleware.js";
//import verifyToken from "../Middleware/authMiddleware.js";

const router = Router()


router.post('/',verifyToken,createParking)
router.put('/:id',verifyToken,updateParking)
 router.get('/',getParking)
 router.get('/:id',getParkingById)
router.delete('/:id',deleteParking)

export default router