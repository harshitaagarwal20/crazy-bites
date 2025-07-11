import db from '../models/index.js';
const { FlatUser, Society,Amenity } = db;


export const createAmenity = async (req, res) => {
  try {
    const {
     name,
      description,
      isActive,
      societyId} = req.body;

    
    if (!name ) {
      return res.status(400).json({ message: 'Name is required' });
    }

     if ( !isActive) {
      return res.status(400).json({ message: 'Company name is required' });
    }
     if (!societyId) {
      return res.status(400).json({ message: 'flatId  is required' });
    }


    const existedAmenityy = await Amenity.findOne({where:{name:name}});
    if (existedAmenityy) {
      return res.status(404).json({ message: 'Amenity is already present !!!' });
    }

    
    const society = await Society.findOne({where:{id:societyId}});
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }

    const amenities = await Amenity.create({
      name,
      description,
      isActive,
      societyId,
    });

    return res.status(201).json({ message: 'Amenity logged successfully',society,amenities });
  } catch (error) {
    console.error('Create Amenity error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


export const updateAmenity = async (req, res) => {
  try {
      const AmenityId = req.params.id;
      const {
      name,
      description,
      isActive,
      societyId} = req.body;



     const amenity = await Amenity.findOne({where: { id:AmenityId },
        include:[
          {model:Society}
        ]
  });
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }

    const amenities =await Amenity.update({
      name,
      description,
      isActive,
      societyId
    });

    return res.status(200).json({ message: 'Amenity updated successfully', amenities });
  } catch (error) {
    console.error('Update Amenity error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getAmenity = async (req, res) => {
  try {
    const amenities = await Amenity.findAll(); 
    res.status(200).json({ message: 'Amenitys fetched successfully', data: amenities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAmenityById = async (req, res) => {
  try {
    const { id } = req.params;

    const amenities = await Amenity.findOne({
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

    if (!Amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }

    res.status(200).json({ message: 'Amenity fetched successfully', data: amenities });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error',err });
  }
};

export const deleteAmenity = async (req, res) => {
  try {
    const AmenityId = req.params.id;

    const deleted = await Amenity.destroy({
      where: { id: AmenityId }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Amenity slot not found" });
    }

    res.status(200).json({ message: "Amenity slot deleted successfully" });
  } catch (error) {
    console.error("Delete Amenity error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};