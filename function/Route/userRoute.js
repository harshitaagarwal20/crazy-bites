import { login,register, logoutUser,getCurrentUser, changeUserDetails, getUser } from "../controller/auth.js";
import Router from 'express'
//import passport from "passport";
 //import   from "../Middleware/authMiddleware.js";
 import verifyToken from "../Middleware/authMiddleware.js";

const router = Router()

router.post('/register',register)

router.post('/login',login)

router.delete('/logout',logoutUser)

router.put('/',changeUserDetails)

router.get('/current',getCurrentUser)

router.get('/',verifyToken,getUser)



// //2FA setup
// router.post(
//   '/2fa/setup',setUp2fa
// );


// // verify Route
// router.post('/2fa/verify',verify2fa)

// //Reset Route
// router.post('/2fa/reset',reset2fa)

export default router