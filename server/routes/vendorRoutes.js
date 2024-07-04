const express = require('express')
const { deleteVendorController, getVendorsController, getVendorByIdController } = require('../controllers/vendorController')

const router = express.Router()

//route for deleteing existing vendor using vendor id
router.delete('/delete/:id', deleteVendorController)

//route for fetching all the vendors
router.get('/get', getVendorsController)

//route for fetching a vendor using vendor id
router.get('/get/:id', getVendorByIdController)

module.exports = router