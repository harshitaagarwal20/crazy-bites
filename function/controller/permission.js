import db from '../models/index.js'

const {Permission} = db;

// Controller function to create a new user
const createPermission = async (req, res) => {
    try {
        const { action,resource } = req.body;
    
        if ( !resource) {
          return res.status(400).json({ message: 'Resource is required' });
        }
         if (!action ) {
          return res.status(400).json({ message: 'Action is required' });
        }
  
    
        const permissions = await Permission.create({
          action,
          resource
        });
    
        res.status(201).json({
          message: 'Permission created successfully',
          permissions,
        });
      } catch (error) {
        console.error("Error creating permission:", error);  // Log the exact error
        res.status(500).json({ message: 'Failed to create permission', error: error.message });
      }
};


export  {createPermission};
