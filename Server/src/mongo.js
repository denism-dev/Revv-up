const {connect} = require('mongoose')

//connect to database
const connectDB = (url) => {
    return connect(url)
}

module.exports = connectDB