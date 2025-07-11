import db from '../models/index.js';
const { FlatUser, Flat, User } = db;

const assignFlatToUser = async (req, res) => {
  try {
    const { flatId, UserId: bodyUserId } = req.body;
    const UserId = bodyUserId || req.user?.id;

    // Check required values first
    if (!flatId || !UserId) {
      return res.status(400).json({ message: "flatId and UserId are required !!" });
    }
    

    const user = await User.findOne({ where: { id: UserId } }); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.mobile) {
      return res.status(400).json({ message: "User mobile is not registered" });
    }

    const flat = await Flat.findOne({ where: { flatUId: flatId } }); 
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    const alreadyAssigned = await FlatUser.findOne({ where: { flatId, UserId } });
    if (alreadyAssigned) {
      return res.status(400).json({ message: "Flat already assigned to this user" });
    }

    const assignment = await FlatUser.create({ flatId, UserId });

    res.status(200).json({ message: "Flat assigned to User", flat: assignment });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getFlatUser = async (req, res) => {
  try {
    const flatUser = await FlatUser.findAll({
      include: [
        {
          model: Flat,
          attributes: ['flatNumber'] ,
          as:'flat'
        },
        {
          model: User,
          attributes: ['full_name'] 
        }
      ],
      order: [['createdAt', 'DESC']] 
    });

    if (!flatUser || flatUser.length === 0) {
      return res.status(404).json({ message: 'No flat-user assignments found' });
    }

    return res.status(200).json(flatUser); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const getFlatUserById = async (req, res) => {
  try {
    const {id} = req.params.id
    if(!id){
       return res.status(404).json({ message: 'flatId not found!!' });
    }

  const flatUser = await FlatUser.findOne(id);

    if (!flatUser ) {
      return res.status(404).json({ message: 'User not found for this flatId' });
    }
    return res.status(200).json({ user: flatUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export default assignFlatToUser