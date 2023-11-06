const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')


//handle cross site request
app.use(cors())

//handle url encoding
app.use(express.urlencoded({ extended: false }));

//expose the dist folder to the public
app.use(express.static('./dist'))

//handle json data parsing
app.use(express.json())

//handle file uploads from forms
app.use(fileUpload())

module.exports = app