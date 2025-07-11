import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './Route/userRoute.js';
import roleRoutes from './Route/roleRoutes.js'; 
import flatRoutes from './Route/flatRoutes.js'; 
import visitorRoutes from "./Route/VisitorRoute.js";
import complainRoutes from "./Route/ComaplaintRoute.js";
import noticeRoutes from "./Route/noticeRoutes.js";
import maintenanceRoute from './Route/MaintenanceRoute.js';
import PermissionRolesRoute from './Route/permissionRolesRoutes.js';
import PermissionRoute from './Route/permissionRoutes.js'
import SocietyRoute from "./Route/SocietyRoute.js";
import TransactionRoute from "./Route/transactionRoute.js";
import amenityRoute from './Route/amenityRoute.js';
import parkingRoute from './Route/parkingRoute.js';

const app = express();

dotenv.config();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/user', userRoutes);    
app.use('/api/role', roleRoutes);          
app.use('/api/flat', flatRoutes); 
app.use('/api/notice', noticeRoutes); 
app.use('/api/complain', complainRoutes); 
app.use('/api/visitor', visitorRoutes); 
app.use('/api/maintenance',maintenanceRoute)
app.use('/api/permission',PermissionRoute)
app.use('/api/permissionRoles',PermissionRolesRoute) 
app.use('/api/society',SocietyRoute)   
app.use('/api/transaction',TransactionRoute) 
app.use('/api/amenity',amenityRoute)
app.use('/api/parking',parkingRoute)

export default app;
