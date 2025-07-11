import db from '../models/index.js';
const { Parking, FlatUser,Flat } = db;


export const createParking = async (req, res) => {
  try {
    const {
      parkingNumber,
      vehicleNumber,
      vehicleType,
      ownerName,
      flatId,
      isVisitorSlot} = req.body;

    
    if (!flatId ) {
      return res.status(400).json({ message: 'FlatId is required' });
    }

     if ( !ownerName) {
      return res.status(400).json({ message: 'Owner name is required' });
    }
     if (!vehicleType) {
      return res.status(400).json({ message: 'Type of vehical  is required' });
    }

    
    const flat = await Flat.findOne({where:{flatId:flatId}});
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    const parking = await Parking.create({
      parkingNumber,
      vehicleNumber,
      vehicleType,
      ownerName,
      flatId,
      status:'occupied',
      isVisitorSlot
    });

    return res.status(201).json({ message: 'Vehical Parked successfully', parking });
  } catch (error) {
    console.error('Create Parking error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


export const updateParking = async (req, res) => {
  try {
    const parkingId = req.params.id;
    const {
      parkingNumber,
      vehicleNumber,
      vehicleType,
      ownerName,
      flatId,
      isVisitorSlot} = req.body;

    const parking = await Parking.findOne({where: { id:parkingId },
        include:[
          {model:FlatUser}
        ]
  });
    if (!parking) {
      return res.status(404).json({ message: 'Parking not found' });
    }

  await Parking.update({
      parkingNumber,
      vehicleNumber,
      vehicleType,
      ownerName,
      flatId,
      status:'vacant',
      isVisitorSlot
    },{
  where: { id:parkingId } 
});

    return res.status(200).json({ message: 'Parking updated successfully' });
  } catch (error) {
    console.error('Update Parking error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


export const getParking = async (req, res) => {
  try {
    const parkings = await Parking.findAll(); 
    res.status(200).json({ message: 'Parkings fetched successfully', data: parkings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getParkingById = async (req, res) => {
  try {
    const { id } = req.params;

    const parkings = await Parking.findOne({
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

    if (!Parking) {
      return res.status(404).json({ message: 'Parking not found' });
    }

    res.status(200).json({ message: 'Parking fetched successfully', data: parkings });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error',err });
  }
};

export const deleteParking = async (req, res) => {
  try {
    const parkingId = req.params.id;

    const deleted = await Parking.destroy({
      where: { id: parkingId }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Parking slot not found" });
    }

    res.status(200).json({ message: "Parking slot deleted successfully" });
  } catch (error) {
    console.error("Delete parking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};