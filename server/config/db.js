const mongoose = require('mongoose')

const configDB = async () => {
    try {
        //connecting to MongoDB using MONGO_URI
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = configDB