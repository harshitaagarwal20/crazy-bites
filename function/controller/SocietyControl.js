import db from '../models/index.js'

const {Society}=db

export const createSociety = async (req, res) => {
  try {
    const { name,address,city,pinCode,licenceNo,maintenanceCostPerSqft} =req.body;
   

    if (!name  ) {
      return res.status(400).json({ message: "Name Of Society required" });
    }
    if (!address  ) {
      return res.status(400).json({ message: "Address of Society required" });
    }
    if ( !maintenanceCostPerSqft ) {
      return res.status(400).json({ message: "maintenanceCostPerSqft is not mentioned" });
    }

    if ( !licenceNo ) {
      return res.status(400).json({ message: "licenceNo is not mentioned" });
    }
   

    // Check if licenceNo already exists
    const exitedlicenceNo = await Society.findOne({where:{licenceNo}}  );

    if (exitedlicenceNo) {
      return res.status(409).json({ message:  "Society Licence No is not valid!!!" });
    }
    
    const newSociety = await Society.create({name,address,city,pinCode,licenceNo,maintenanceCostPerSqft });

    return res.status(201).json({
      Society: newSociety,
      message: "Society registered successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

 export const UpdateSociety = async (req, res) => {
  const { name,address,city,pinCode,licenceNo,maintenanceCostPerSqft } = req.body;

  if(!licenceNo){
    return res.status(404).json({ message: "Licence No is not mentioned" });
  }

  try {
    const society = await Society.findOne({ where: { licenceNo } });
    
    if (!society) {
      return res.status(404).json({ message: "Licence No is not correct" });
    }

    const newSociety= await society.update({
        name,address,city,pinCode,licenceNo,maintenanceCostPerSqft}
    )

    res.status(200).json({ message: "Society Details have been updated", newSociety });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getSociety = async (req, res) => {
  try {
   

    const society = await Society.findAll();

    if (!society ) {
      return res.status(404).json({ message: 'The societies are not found '})
    }

    return res.status(200).json(society)
     


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getSocietyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'licenceNo is required' });
    }

    const society = await Society.findOne({
      where: { id },
     
    });

    if (!society ) {
      return res.status(404).json({ message: 'Society with this licence No are' });
    }

    return res.status(200).json({ SocietyDetails: society });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const deleteSociety = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'licenceNo is required' });
    }

    const society = await Society.findOne({
      where: { id },
      
    });
    if (!society ) {
      return res.status(404).json({ message: 'Society with this licence No are' });
    }
    
    const remove = await Society.destroy({where:{id}})
    if(!remove){
        return res.status(404).json({ message: 'Society is not deleted' });
    }

    return res.status(200).json( {Message:  'Society has been removed ' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

