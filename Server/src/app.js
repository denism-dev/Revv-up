//initialize server
const app = require('./server');
const connectDB = require('./mongo')

//allow the use of .env to set environment variables
require('dotenv').config()

//handle errors
require('express-async-errors')

//routes
app.use('/api/vehicles', require('../Routes/VehicleRoutes'))

//handle server and database connection(this will collect all errors in-case there was a misconfiguration)
//Will also prevent the server form starting if the database was misconfigured
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT)
    } catch (error) {
        console.log(error)
    }
}

//initialize the server and database
start()
.then(()  => {
        console.log(`Server is listening on port ${process.env.PORT}`)
    })
.catch((error) => {
        console.log(error)
    })


