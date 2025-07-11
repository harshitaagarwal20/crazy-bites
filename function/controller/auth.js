
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import speakeasy from 'speakeasy'
// import qrCode from "qrcode";
import db from '../models/index.js'
import passport from "passport";

import { canUpdate, canView } from '../utils/defineAbility.js';




const {Role,User} = db;

export const register = async (req, res) => {
  try {
    const { full_name, email, mobile, password, role,roleId,LicenceNo } = req.body;

    if (!full_name ) {
      return res.status(400).json({ message: 'Fullname is required' });
    }
    if ( !email  ) {
      return res.status(400).json({ message: 'email is required' });
    }
    if ( !mobile ) {
      return res.status(400).json({ message: 'mobile is required' });
    }
    if ( !password ) {
      return res.status(400).json({ message: 'password is required' });
    }
    


    const fineRole = await Role.findOne({ where: { role:role } });
    if (!fineRole) {
      return res.status(400).json({ message: 'Role is invalid' });
    }

    console.log('Role found:', fineRole);

    const roleIdd = fineRole.roleUId
    if (!roleIdd) {
      return res.status(400).json({ message: 'Role ID or role name is required' });
    }


    const existingUser = await User.findOne({ where: { mobile },
     attributes: ['id', 'full_name', 'password', 'email', 'mobile', 'role'] });
    if (existingUser) {
      return res.status(400).json({ message: 'User is already registered' });
    }

    console.log('No existing user found, proceeding to register');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      mobile,
      password: hashedPassword,
      role,
      roleId:roleIdd,
      LicenceNo
  });

   

    return res.status(201).json({ message: 'User is registered', user });
  } catch (err) {
    console.error(' Error in registration:', err);
    return res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    
    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile and password are required !!!!" });
    }

    const user = await User.findOne({ where: { mobile },
     attributes: ['id', 'full_name', 'password', 'email', 'mobile', 'role']
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

  
    const token = jwt.sign(
      {
        id: user.id,
        name: user.fullName,   
        mobile: user.mobile,
        LicenceNo:user.LicenceNo
      },
      process.env.JWT_SECRET || 'your_default_secret',
      { expiresIn: '24h' }
    );

    
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        
        LicenceNo:user.LicenceNo
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



export const logoutUser = async (req, res) => {
  try {
    const id = await findOne(req.params.id)
    if(!id){
      res.json("Refresh Token not found")
    }
    await User.update({ refreshToken: null }, { where: { id: req.user.id } });
    return res.status(200).json({ message: "Admin logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const changeUserDetails = async (req, res) => {
  try {
    const { oldPassword, newPassword, full_name, email,LicenceNo } = req.body;
     if (!LicenceNo) {
      return res.status(404).json({ message: "Licence No not found" });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    const updates = {
      full_name,
      email,
    };

    
    if (newPassword) {
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    const newUser =await user.update(updates, {
      context: { userId: req.user.id }, 
    });

    return res.status(200).json({ message: "User details updated successfully",newUser });
  } catch (error) {
    console.error("Change user details error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const users = await User.findOne({
  where: { id: user.id },
  });

    return res.status(200).json({
      users,
      message: "User fetched successfully"
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ message: "Internal server error",error });
  }
};

export const getUser = async (req, res) => {
  try {
    
    const users = await User.findAll({});

    return res.status(200).json({
      users,
      message: "User's fetched successfully"
    });
  } catch (error) {
    console.error("Get User error:", error);
    return res.status(500).json({ message: "Internal server error",error });
  }
};



// const setUp2fa = async (req,res) => {
//     try {
        
//         const userData = req.user
//         const user = await User.findOne({where:{mobile:userData.mobile}})

//         var secret = speakeasy.generateSecret();

//         console.log('Secret Object is ',secret)
//            user.twoFactorSecret = secret.base32
           
//            await user.save()

//            const url = speakeasy.otpauthURL({
//             secret: secret.base32,
//             label: `${req.user.mobile}`,
//             issuer:'www.test.com',
//             encoding: "base32"
//     })
//          const Qr = await qrCode.toDataURL(url);
//          res.status(200).json({qrCode:Qr})
//     } catch (error) {
//           res.status(400).json("Error registering user",err)
//     }
// }

// const verify2fa = async( req,res) =>{
//     try {
//         const token = req.body
//         const userData = req.user
//         const user = await User.findOne({ where: { mobile: userData.mobile } });

//         const verifyOTP = speakeasy.totp({
//             secret:user.twoFactorSecret,
//             encoding:'base32',
//             token
//         })

//         if(verifyOTP){
//             const jwt = jwt.sign({mobile:user.mobile},
//                process.env.JWT_SECRET || defaultSecret ,
//                {expiresIn:'1h'} 
//             )

//             res.status(200).json({message: "2fa Authentication is sucessfull", token: jwt})
//         } else
//  res.status(400).json({message: "2fa Invalid",})
  
//     } catch (error) {
//         res.status(500).json('Internal Server Error',error)
//     }
// }

// const reset2fa = async (req,res) => {
//     try {
//         const user = req.user
//         user.twoFactorSecret= "",
//         await user.sava()
//         res.status(200).json({message:'Reseting 2fa sucessfull'})
        
//     } catch (error) {
//         res.status(500).json({message:'Error in reseting 2fa'})
//     }
// }

