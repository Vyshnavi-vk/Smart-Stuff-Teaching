const Product = require('../models/productModel')

/* CONTROLLER FOR CREATING A NEW PRODUCT */
const createProductController = async (req, res) => {
    const { productId,
        productName,
        description,
        itemType,
        format,
        productURL,
        store,
        approvalStatus,
        image,
        file,
        configuration,
        details,
        vendor
    } = req.body


    try {
        //takes all the fields from req.body and creates a product
        const product = await Product.create({
            productId,
            productName,
            description,
            itemType,
            format,
            productURL,
            store,
            approvalStatus,
            image,
            file,
            configuration,
            details,
            vendor
        })

        if (product) {
            res.status(201).json({ message: "Product created successfully" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR UPDATING AN EXISTING PRODUCT */
const updateProductController = async (req, res) => {
    const { id } = req.params
    const { productId,
        productName,
        description,
        itemType,
        format,
        productURL,
        store,
        approvalStatus,
        image,
        file,
        configuration,
        details,
        vendor
    } = req.body

    try {
        //finds the product which needs to be updated using id and updates 
        //that product accordingly
        const product = await Product.findByIdAndUpdate(id, {
            productId,
            productName,
            description,
            itemType,
            format,
            productURL,
            store,
            approvalStatus,
            image,
            file,
            configuration,
            details,
            vendor

        }, { new: true })

        if (product) {
            res.status(200).json({ message: "Product updated successfully" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR DELETING AN EXISTING PRODUCT*/
const deleteProductController = async (req, res) => {
    const { id } = req.params
    try {
        //finds product by id and deletes that product
        await Product.findByIdAndDelete(id)
        res.status(200).json({ messsage: "Product deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR FETCHING ALL THE PRODUCTS */
const getProductsController = async (req, res) => {
    try {
        //fetches the products along with its respective vendor details
        const products = await Product.find({}).populate("vendor").exec()
        res.status(200).json({ products: products })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR FETCHING A PRODUCT BY ID */
const getProudctByIdController = async (req, res) => {
    const { id } = req.params
    try {
        //finds the product by id
        const productById = await Product.findById(id)
        res.status(200).json({ product: productById })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports = { createProductController, updateProductController, deleteProductController, getProductsController, getProudctByIdController }