const express = require('express')
const router = express.Router()
const vehicleController = require('../Controllers/VehicleController')

//router

//upload files
router.post('/temp/upload', vehicleController.validateImage)

//search route
router.get('/search', vehicleController.searchVehicle)

//generate fake data for testing
router.get('/fake', vehicleController.fakeData)


//api routes
router.get('/',vehicleController.getAllVehicles)
router.get('/:id',vehicleController.getVehicle)
router.post('/',vehicleController.createVehicle)
router.patch('/:id',vehicleController.updateVehicle)
router.delete('/:id',vehicleController.deleteVehicle)
router.delete('/',vehicleController.deleteAllVehicle)


module.exports = router