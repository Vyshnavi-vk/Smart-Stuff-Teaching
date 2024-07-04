const mongoose = require('mongoose')


/* CREATING VENDOR SCHEMA WITH THE NECESSARY FIELDS */
const vendorSchema = new mongoose.Schema({
    name: { type: String },
    profileURI: { type: String },
    description: { type: String },
    backgroundImage: { type: String },
    avatarImage: { type: String },
    vendorShopOwner: { type: String },
    productURL: [{
        type: mongoose.ObjectId,
        ref: 'Product'
    }],
    contactInfo: {
        location: { type: String },
        storeEmail: { type: String },
        telephone: { type: String },
        legalNotes: { type: String }
    },
    socialProfile: {
        facebook: { type: String },
        linkedin: { type: String },
    },
    payments: {
        paypalEmailAddress: { type: String },
        bankAccount: { type: String },
        commission: { type: Number },
        registrationDate: { type: Date }
    }
})


const Vendor = mongoose.model('Vendor', vendorSchema)
module.exports = Vendor