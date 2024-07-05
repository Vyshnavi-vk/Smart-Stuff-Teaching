const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const configDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const productRoutes = require('./routes/productRoutes')
const multer = require('multer')
const path = require('path');
const { createVendorController, updateVendorController } = require('./controllers/vendorController')


/*CREATING EXPRESS SERVER AND CONFIGURING INITIAL SETUPS */
const app = express()

dotenv.config()
configDB()
app.use(express.json())
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));


app.use('/uploads', express.static('/tmp/uploads'));


/* HANDLING IMAGE UPLOAD USING MULTER */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.join(__dirname, "../public/assets"))
        cb(null, '/tmp/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage }).fields([
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'avatarImage', maxCount: 1 }
])



const PORT = process.env.PORT || 8080


/* API ENDPOINTS */
app.get('/', (req, res) => {
    res.send(`API running successfully on port ${PORT}`)
})


/* USER API's */
app.use('/api/user', userRoutes)


/* VENDOR API's */
app.post("/api/vendor/create", upload, createVendorController);
app.put('/api/vendor/update/:id', upload, updateVendorController)
app.use('/api/vendor', vendorRoutes)


/* PRODUCT API's */
app.use('/api/product', productRoutes)


/* SERVER LISTENING TO PORT */
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})