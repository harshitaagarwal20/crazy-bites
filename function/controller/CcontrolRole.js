import db from '../models/index.js'

const {Role} = db;

// Controller function to create a new user
const createRole = async (req, res) => {
    try {
        const { role } = req.body;
    
        if (!role ) {
          return res.status(400).json({ message: 'Role are required' });
        }
  
    
        const roles = await Role.create({
          role,
         
        });
    
        res.status(201).json({
          message: 'Role created successfully',
          roles,
        });
      } catch (error) {
        console.error("Error creating role:", error);  
        res.status(500).json({ message: 'Failed to create role', error: error.message });
      }
};


export  {createRole} ;
