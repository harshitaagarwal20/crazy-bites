
import { createPermissionRole } from "../controller/PermissionRoles.js";
import Router from 'express'

const router = Router()

router.post('/',createPermissionRole)


export default router