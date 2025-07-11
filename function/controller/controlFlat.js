
import { Model, Op } from 'sequelize';
import db from '../models/index.js'

const {Flat,User,FlatUser}=db

const createflat = async (req, res) => {
  try {
    const { flatNumber, block, flatType, floor ,areapersqfeet} =req.body;
   // const id = req.user

    if (!flatNumber || !block || !flatType || !areapersqfeet ) {
      return res.status(400).json({ message: "flatNumber, block, FlatType, areapersqfeet fields are required" });
    }
    

    // Check if flat already exists
    const existedflat = await Flat.findOne({
      where: {
        flatNumber
      }
    });

    if (existedflat) {
      return res.status(409).json({ message: "Flat with this number already exists" });
    }
    
    const newFlat = await Flat.create({ flatNumber, block, flatType, floor , areapersqfeet});

    return res.status(201).json({
      flat: newFlat,
      message: "Flat registered successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



const UpdateassignFlatToUser = async (req, res) => {
  const { UserId, flatId } = req.body;

  try {
    const user = await User.findOne({ where: { UserId } });
    const existingFlat = await FlatUser.findOne({ where: { flatId } });

    if (!user || !existingFlat) {
      return res.status(404).json({ message: "User or Flat not found" });
    }

    existingFlat.UserId = UserId;
    await existingFlat.save();

    res.status(200).json({ message: "Flat assigned to newUser", existingFlat });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


 const getUserByFlat = async (req, res) => {
  try {
   

    const flatUser = await Flat.findAll();

    if (!flatUser ) {
      return res.status(404).json({ message: 'User not found for this flatId' });
    }

    return res.status(200).json({ user: flatUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getUserByFlatId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'flatId is required' });
    }

    const flat = await FlatUser.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'full_name', 'email', 'mobile']
         
        }
      ]
    });

    if (!flat ) {
      return res.status(404).json({ message: 'User not found for this id' });
    }

    return res.status(200).json({ user: flat.User });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const deleteflat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Id is required' });
    }

    const flat = await Flat.findOne({
      where: { id }
    });
    if (!flat ) {
      return res.status(404).json({ message: 'flat not found!!!' });
    }
    
    const remove = await Flat.destroy({where:{id}})
    if(!remove){
        return res.status(404).json({ message: 'flat is not deleted' });
    }

    return res.status(200).json( 'removed flat with is LicenceNo ' );

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




export {createflat, UpdateassignFlatToUser, getUserByFlat, getUserByFlatId }

