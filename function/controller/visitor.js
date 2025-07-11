import db from '../models/index.js'
const { Visitor, FlatUser, User,Otp ,Flat} = db;
import defineAbilitiesFor from '../permission.js';
import generateOTP from '../otp.js';
import sendOtp from '../sendOtp.js'; 

export const createVisitor = async (req, res) => {
  try {
    const { name, mobile, purpose, inTime, outTime, flatNumber } = req.body;
    const userId = req.user?.id;

    if (!name || !mobile || !purpose || !flatNumber) {
      return res.status(400).json({ message: 'Fields are required' });
    }

    const findUser = await User.findOne({ where: { id: userId } });
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const findFlat = await Flat.findOne({
      where: { flatNumber },
      attributes: ['id', 'flatUId'],
    
    });
    
    const flatId =  findFlat.flatUId

    const findFlatMobile = await FlatUser.findOne({flatId,
  include: [
        {
          model: User,
          attributes: ['id', 'mobile'],
          }
      ]})

    console.log(':flat', findFlat);
    console.log(':flatUser', findFlat?.User);

    

    if (!findFlat || !flatId || !findFlatMobile ) {
      return res.status(404).json({ message: 'Check flatId correctly!!!' });
    }

    
    
    const otp = generateOTP();

     await Otp.create({
      Otp: otp,
      
    })


    await sendOtp(findFlatMobile, 'Your OTP Code', `Your OTP is: ${otp}`);
    console.log('Your OTP Code', `Your OTP is: ${otp}`);

    const newVisitor = await Visitor.create({
      name,
      mobile,
      purpose,
      flatId,
      inTime,
      outTime,
    
      senderId:findUser.id,
      recieverId:findFlat.id,
      status:'pending'
    });

    return res.status(201).json({ message: 'Visitor created, OTP sent for approval', visitor: newVisitor, otp });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



export const verifyVisitorOTP = async (req, res) => {
  const { visitorId, otp } = req.body;

if (!visitorId) {
  return res.status(400).json({ message: 'visitorId is required' });
}
  try {
   
    const visitor = await Visitor.findOne({ where: {id:visitorId} });

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    const otpp = await Otp.findOne({where:{Otp:otp}})

     if (!otpp) {
      return res.status(404).json({ message: ' OTP Stored in databse' });
    }
  
    
console.log('Entered OTP:', otp);
console.log('Stored OTP:', otpp.Otp);

console.log(typeof otpp.otp); 
console.log(typeof otp);


   if (String(otpp.Otp) !== String(otp)) {
  return res.status(400).json({ message: 'Invalid OTP !!' });
}

    visitor.status = 'approved';
    await visitor.save();

    otpp.Otp = null;
    


    await otpp.save();

    return res.status(200).json({ message: 'Visitor approved successfully',visitor,otpp });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during OTP verification',error });
  }
};


export const getVisitor = async (req, res) => {
  try {
    const visitors = await Visitor.findAll(); 
    res.status(200).json({ message: 'Visitors fetched successfully', data: visitors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getVisitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findOne({
      where: { id },
      include: [
        {
          model: FlatUser,
          
          include: [
            {
              model: User,
              attributes: ['id', 'mobile']
            }
          ],
          attributes: ['flatId', 'UserId']
        }
      ]
    });

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    res.status(200).json({ message: 'Visitor fetched successfully', data: visitor });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'LicenceNo is required' });
    }

    const visitor = await Visitor.findOne({
      where: { LicenceNo },
      
    });
    if (!visitor ) {
      return res.status(404).json({ message: 'Visitor with this licence No are' });
    }
    
    const remove = await Visitor.destroy(visitor)
    if(!remove){
        return res.status(404).json({ message: 'Visitor is not deleted' });
    }

    return res.status(200).json( 'removed Visitor with is LicenceNo ' );

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

