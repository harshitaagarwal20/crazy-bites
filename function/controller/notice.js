import db from '../models/index.js'
import { AbilityBuilder } from '@casl/ability';
import defineAbilitiesFor from '../permission.js';


const { Notice, FlatUser ,User} = db;

export const createNotice = async (req, res) => {
  try {
    const { title, content, isPinned, category, userId: bodyUserId } = req.body;
    const userId = req.user?.id || bodyUserId;

    // Check for missing fields
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'All fields are required!!!' });
    }

    // Check user ability
    // const ability = defineAbilitiesFor(userId);

    // if (!ability.can('create', 'Notice')) {
    //   return res.status(403).json({ message: 'Access denied' });
    // }

    const newNotice = await Notice.create({ title, content, isPinned, category, userId });

    return res.status(201).json({
      message: 'Notice created successfully',
      data: newNotice
    });

  } catch (error) {
    console.log('My error is', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};


 export const getNotice = async (req, res) => {
  try {
    const notices = await Notice.findAll({
      include: [
        {
          model: FlatUser,
          include: [
            {
              model: User,
              attributes: ['id', 'mobile']
            }
          ]
        }
      ],
      
    });

    return res.status(200).json({ notices });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Notice ID is required' });
    }

    const notice = await Notice.findOne({
      where: { id },
      include: [
        {
          model: FlatUser,
          include: [
            {
              model: User,
              attributes: ['id', 'mobile']
            }
          ]
        }
      ],
    });

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    return res.status(200).json({ notice });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findOne({ where: { id },
       include: [
        {
          model: FlatUser,
          include: [
            {
              model: User,
              attributes: ['id', 'mobile']
            }
          ]
        }
      ]
    });

if (!notice) {
      return res.status(404).json({ message: "notice record not found" });
    }

 notice.isPinned = 'false';
    await notice.save();
    
    return res.status(200).json({ message: "Marked as Unpaid", data: notice });
  } catch (err) {
         console.error("Error marking as paid:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Id is required' });
    }

    const notice = await Notice.findOne({
      where: { id },
      
    });
    if (!notice ) {
      return res.status(404).json({ message: 'Notice with this licence No are' });
    }
    
    const remove = await Notice.destroy(notice)
    if(!remove){
        return res.status(404).json({ message: 'Notice is not deleted' });
    }

    return res.status(200).json( 'removed Notice with is LicenceNo ' );

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

