import { createPermission } from "../controller/permission.js";
import Router from 'express'

const router = Router()

router.post('/',createPermission)


export default router