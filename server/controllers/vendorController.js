const Vendor = require('../models/vendorModel')


/* CONTROLLER FOR VENDOR CREATION */
const createVendorController = async (req, res) => {
    const { name,
        profileURI,
        description,
        vendorShopOwner,
        productURL
    } = req.body


    try {
        //creates a vendor by taking the fields from req.body
        const vendor = await Vendor.create({
            name,
            profileURI,
            description,
            backgroundImage: req.files.backgroundImage[0].filename,
            avatarImage: req.files.avatarImage[0].filename,
            vendorShopOwner,
            productURL,
            contactInfo: {
                location: req.body['contactInfo.location'],
                storeEmail: req.body['contactInfo.storeEmail'],
                telephone: req.body['contactInfo.telephone'],
                legalNotes: req.body['contactInfo.legalNotes'],
            },
            socialProfile: {
                facebook: req.body['socialProfile.facebook'],
                linkedin: req.body['socialProfile.linkedin'],
            },
            payments: {
                paypalEmailAddress: req.body['payments.paypalEmailAddress'],
                bankAccount: req.body['payments.bankAccount'],
                commission: req.body['payments.commission'],
                registrationDate: req.body['payments.registrationDate']
            },
        })

        if (vendor) {
            res.status(201).json({ message: "Vendor Created Successfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR UPDATING AN EXISTING VENDOR USING ID */
const updateVendorController = async (req, res) => {
    const { name,
        profileURI,
        description,
        vendorShopOwner,
    } = req.body

    const { id } = req.params

    try {
        //finds the vendor with the id which needs to be updated, and updates
        //vendor accordingly
        const vendor = await Vendor.findByIdAndUpdate(id, {
            name,
            profileURI,
            description,
            backgroundImage: req.files.backgroundImage[0].filename,
            avatarImage: req.files.avatarImage[0].filename,
            vendorShopOwner,
            productURL,
            contactInfo: {
                location: req.body['contactInfo.location'],
                storeEmail: req.body['contactInfo.storeEmail'],
                telephone: req.body['contactInfo.telephone'],
                legalNotes: req.body['contactInfo.legalNotes'],
            },
            socialProfile: {
                facebook: req.body['socialProfile.facebook'],
                linkedin: req.body['socialProfile.linkedin'],
            },
            payments: {
                paypalEmailAddress: req.body['payments.paypalEmailAddress'],
                bankAccount: req.body['payments.bankAccount'],
                commission: req.body['payments.commission'],
                registrationDate: req.body['payments.registrationDate']
            },
        }, { new: true })

        if (vendor) {
            res.status(200).json({ message: "Vendor Updated Successfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR DELETING AN EXISTING VENDOR USING ID */
const deleteVendorController = async (req, res) => {
    const { id } = req.params
    try {
        //finds vendor by id and deletes it
        await Vendor.findByIdAndDelete(id)
        res.status(200).json({ msg: "Vendor deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR FETCHING ALL THE VENDORS */
const getVendorsController = async (req, res) => {
    try {
        //fetches all vendors
        const vendors = await Vendor.find().populate({ path: 'productURL', select: { productName: 1, productURL: 1 } })
        return res.status(200).json({ vendors: vendors })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR FETCHING VENDOR BY ID */
const getVendorByIdController = async (req, res) => {
    const { id } = req.params
    try {
        //fetches a vendor by id
        const vendorById = await Vendor.findById(id)
        res.status(200).json({ vendor: vendorById })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports = { createVendorController, updateVendorController, deleteVendorController, getVendorsController, getVendorByIdController }