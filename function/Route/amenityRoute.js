import { createAmenity, deleteAmenity, getAmenity, getAmenityById, updateAmenity} from "../controller/Amenity.js";
import Router from 'express'
import verifyToken from "../Middleware/authMiddleware.js";
//import verifyToken from "../Middleware/authMiddleware.js";

const router = Router()


router.post('/',verifyToken,createAmenity)
router.put('/:id',verifyToken,updateAmenity)
 router.get('/',getAmenity)
 router.get('/:id',getAmenityById)
 router.delete('/:id',deleteAmenity)


export default router