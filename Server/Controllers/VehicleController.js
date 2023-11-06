const Vehicle = require('../Models/Vehicle');
const {resolve} = require("path");
const fake = require('../Models/VehicleFaker')

//create model
const createVehicle = async (req, res) => {
    try {
        const vehicleData = req.body;
        const vehicle = new Vehicle(vehicleData);
        const savedVehicle = await vehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(400).json({error: error});
    }
}

//search for model in the database
const searchVehicle = async (req, res) => {
    try {
        const queryString = req.query.search;
        let vehicles

        if (queryString){
            const query = {
                //searches for the existence in every field
                $or: [
                    { title: { $regex: queryString, $options: 'i' } },
                    { model: { $regex: queryString, $options: 'i' } },
                    { year: !isNaN(queryString) ? Number(queryString) : '' },
                    { transmissionType: { $regex: queryString, $options: 'i' } },
                    { description: { $regex: queryString, $options: 'i' } },
                    { sellerName: { $regex: queryString, $options: 'i' } },
                    { sellerContact: { $regex: queryString, $options: 'i' } },
                ]
            };

             vehicles = await Vehicle.find(query);
        }else {
             vehicles = await Vehicle.find();
        }

        res.json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

//fetch all vehicles
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(400).json({error: error});
    }
};

//get vehicle using ID
const getVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findById(vehicleId);
        if (vehicle) {
            res.json(vehicle);
        } else {
            res.status(404).json({error: 'Vehicle not found'});
        }
    } catch (error) {
        res.status(400).json({error: error});
    }
};


//update vehicle using ID
const updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updatedData = req.body;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updatedData, {
            new: true,
        });
        if (updatedVehicle) {
            res.json(updatedVehicle);
        } else {
            res.status(404).json({error: 'Vehicle not found'});
        }
    } catch (error) {
        res.status(400).json({error: error});
    }
};

//delete vehicle using
const deleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!deletedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.status(200).json(deletedVehicle);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
  

//delete all vehicles(For development purposes)
const deleteAllVehicle = async (req, res) => {
    try {
        const deletedVehicles = await Vehicle.deleteMany({});
        if (deletedVehicles.deletedCount > 0) {
            res.json({message: 'All vehicles deleted successfully'});
        } else {
            res.status(404).json({error: "No records to delete..."});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
};

//upload the file
const validateImage = async (req, res) => {
    try {
        const productImage = req.files.file
     console.log(productImage);
        const imagePath = resolve('dist','uploads',productImage.name)

        checkDirectory()

        await productImage.mv(imagePath)

        res.status(200).send({
            status:"success",
            imagePath:"uploads/"+productImage.name
        })
    }catch (error){
        res.status(500).json({error: error})
    }

}

//checks id the upload folder exist and create one if it's not present
const checkDirectory = () => {
    const fs = require('fs');
    const dir = resolve('dist','uploads')

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

//generate fake data
const fakeData = async (req,res) => {
    await fake()
    res.send("done")
}

module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
    deleteAllVehicle,
    validateImage,
    searchVehicle,
    fakeData
};
