const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    }, // Entry name
    price: {
        type:Number,
        required:true
    }, // Price of the vehicle
    model: {
        type:String,
        required:true
    }, // Vehicle model
    year: {
        type:Number,
        required:true
    }, // Year of the vehicle
    transmissionType: {
        type:String,
        required:true
    }, // Transmission type (e.g., automatic, manual)
    engineCapacity: {
        type:Number,
        required:true
    }, // Engine capacity in liters
    description: String, // Description of the vehicle
    sellerName: {
        type:String,
        required:true
    }, // Name of the seller
    sellerContact: {
        type:String,
        required:true
    }, // Contact information of the seller

    // For storing multiple images
    images: [],

    //image that will be displayed in the homepage
    active_image:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Vehicles',VehicleSchema)