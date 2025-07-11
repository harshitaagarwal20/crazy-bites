import { createMaintenance, deleteMaintenance, getMaintenance, getMaintenanceById, MaintenancePaid, } from "../controller/maintenance_Contrl.js";
import verifyToken from "../Middleware/authMiddleware.js";

import Router from 'express'
//import { checkRole } from "../Middleware/permission.js";

const router = Router()


router.post('/',verifyToken,createMaintenance)
router.get('/',verifyToken,getMaintenance)
router.get('/:id',verifyToken,getMaintenanceById)
router.put('/:id',verifyToken,MaintenancePaid)
router.delete('/:id',verifyToken,deleteMaintenance)

export default router