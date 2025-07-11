
import db from '../models/index.js';
const { FlatUser, Flat, Maintenance, Society } = db;

export const createMaintenance = async (req, res) => {
  try {
    const { flatNumber, description, dueDate, status, societyId } = req.body;
    const userId = req.user?.id;

    
    if (!flatNumber) return res.status(400).json({ message: "flatNumber is required" });
    if (!description) return res.status(400).json({ message: "Description is required" });
    if (!dueDate) return res.status(400).json({ message: "Due date is required" });
    if (!societyId) return res.status(400).json({ message: "Society id is required" });

    
    const society = await Society.findOne({ where: { id: societyId } });
    if (!society) return res.status(404).json({ message: "Society not found" });
    if (!society.maintenanceCostPerSqft)
      return res.status(400).json({ message: "Society maintenance rate not set" });


    const flat = await Flat.findOne({
      where: { flatNumber },
      attributes: ['id', 'areapersqfeet','flatUId'],
    });

    if (!flat) return res.status(404).json({ message: "Flat not found" });
    if (!flat.areapersqfeet)
      return res.status(400).json({ message: "Maintenance amount calculation failed — area missing" });

  
    const maintenanceAmount = society.maintenanceCostPerSqft * flat.areapersqfeet;

    
    const newMaintenance = await Maintenance.create({
      flatId: flat.flatUId,
      description,
      dueDate,
      amount: maintenanceAmount,
      status: status || 'pending',
      userId,
      societyId: society.id
    });

    return res.status(201).json({ message: "Maintenance created", data: newMaintenance });

  } catch (err) {
    console.error(" Maintenance creation failed:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


export const MaintenancePaid = async (req, res) => {
  try {
    const { id } = req.params;

    const maintenance = await Maintenance.findOne({ where: { id },
      attributes: ['id','description', 'dueDate','status','societyId']});
if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

 maintenance.status = 'paid';
    await maintenance.save();
    
    return res.status(200).json({ message: "Marked as paid", data: maintenance });
  } catch (err) {
         console.error("Error marking as paid:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


 export const getMaintenance = async (req, res) => {
  try {
   
    const maintenance = await Maintenance.findAll({
      attributes: ['id','description', 'dueDate','status','flatId','societyId']});

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance not found ' });
    }

    return res.status(200).json({ maintenance });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getMaintenanceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'MaintenanceId is required' });
    }

    const maintenance = await Maintenance.findOne({
      where: { id:id },
      attributes: ['id','description', 'dueDate','status','societyId','flatId']
    });

    if (!maintenance ) {
      return res.status(404).json({ message: 'User not found for this flatId' });
    }

    return res.status(200).json({message:'Maintenance', maintenance });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Maintenance ID is required' });
    }

    const maintenance = await Maintenance.findOne({ where: { id } });

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance not found' });
    }
    
    const deleted = await Maintenance.destroy({ where: { id } });
    return res.status(200).json({ message: `Maintenance with ID ${id} deleted successfully` });

  } catch (error) {
    console.error(' Error deleting maintenance:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
