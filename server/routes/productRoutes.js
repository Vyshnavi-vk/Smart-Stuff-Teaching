const express = require('express')
const { createProductController, updateProductController, deleteProductController, getProductsController, getProudctByIdController } = require('../controllers/productController')

const router = express.Router()


//route for creating a new product
router.post('/create', createProductController)

//route for updating an existing product using the product id
router.put('/update/:id', updateProductController)

//route for deleting an existing product using the product id
router.delete('/delete/:id', deleteProductController)

//route for fetching all the products
router.get('/get', getProductsController)

//route for fetching a product by product id
router.get('/get/:id', getProudctByIdController)

module.exports = router