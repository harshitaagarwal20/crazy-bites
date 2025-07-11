import { createRole } from "../controller/CcontrolRole.js";
import Router from 'express'

const router = Router()

router.post('/role',createRole)


export default router