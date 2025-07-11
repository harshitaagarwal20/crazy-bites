import db from '../models/index.js';

const { Complaint,User} = db;

export const createComplaint = async (req, res) => {
  try {
    console.log("Received body:", req.body); 

    const { status, category, title, description, UserId: bodyUserId } = req.body;
    const UserId = bodyUserId || req.user?.id;

    if (!UserId || !category || !title || !description) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newComplaint = await Complaint.create({
      
      status,
      category,
      title,
      description,
      userId: UserId
    });

    return res.status(201).json({
      message: 'Complaint has been filed',
      data: {newComplaint,
        title:title.newComplaint},
    });

  } catch (error) {
    console.error('Error creating complaint:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
};


  export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll({
  attributes: ['id', 'userId', 'category', 'title', 'description', 'status', 'createdAt', 'updatedAt']
});
 
    return res.status(200).json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


 export const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOne({ where: { id } ,
    
  attributes: ['id', 'userId', 'category', 'title', 'description', 'status', 'createdAt', 'updatedAt'] 
});


    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    return res.status(200).json({ complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 export const updateComplain = async (req, res) => {
  try {
    const { id } = req.params;
    const {category, title, description} = req.body

    const complain = await Complaint.findOne({ where: { id },
      attributes: ['id', 'userId', 'category', 'title', 'description', 'status'] })

      if (!complain) {
      return res.status(404).json({ message: "complaint record not found" });
    }

const updatedComplaint = await Complaint.update(
  {
    status: 'resolved',
    category,
    title,
    description
  },
  {
    where: { id }
  }
);
    
    return res.status(200).json({ message: "Marked as resolved", data: complainss });
  } catch (err) {
    console.error("Error marking as resolved:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



export const deleteComplainById = async (req, res) => {
  try {
    const userId = req.user.id;
    const complainId = req.params.id;

    if (!complainId) {
      return res.status(400).json({ message: 'Complaint ID is required.' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User is required.' });
    }

    const complain = await Complaint.findOne({
      where: {
        id: complainId
      }
    });

    if (!complain) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    const removed = await Complaint.destroy({
      where: { id: complainId }
    });

    if (removed === 0) {
      return res.status(404).json({ message: 'Complaint could not be deleted.' });
    }

    return res.status(200).json({ message: 'Complaint deleted successfully.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
