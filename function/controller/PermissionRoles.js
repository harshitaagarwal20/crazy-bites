import db from '../models/index.js'


const {PermissionRole} = db;


const createPermissionRole = async (req, res) => {
    try {
        const { permissionId,roleId } = req.body;
    
        // if ( !permissionId ) {
        //   return res.status(400).json({ message: 'PermissionId is required' });
        // }
         if (!roleId ) {
          return res.status(400).json({ message: 'RoleId is required' });
        }
  
    
        const permissionRoles = await PermissionRole.create({
          permissionId,
          roleId
        });
    
        res.status(201).json({
          message: 'Permission created successfully',
          permissionRoles,
        });
      } catch (error) {
        console.error("Error creating permission:", error);  
        res.status(500).json({ message: 'Failed to create permission', error: error.message });
      }
};



export  {createPermissionRole};
