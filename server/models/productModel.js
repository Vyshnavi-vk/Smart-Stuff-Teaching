const mongoose = require('mongoose')


/* CREATING PRODUCT SCHEMA WITH THE NECESSARY FIELDS */
const productSchema = new mongoose.Schema({
    productId: { type: String },
    productName: { type: String },
    description: { type: String },
    itemType: { type: String },
    format: { type: String },
    productURL: { type: String },
    store: { type: String },
    approvalStatus: { type: String },
    image: { type: String },
    file: { type: String },
    configuration: {
        isFeatured: { type: Boolean, default: false },
        isFree: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
    },

    details: {
        answerKey: {
            type: String
        },
        gradeLevels: {
            type: [String]
        },
        subjects: {
            type: [String]
        },
        resourceTypes: {
            type: [String]
        },
        format: {
            type: String
        },
        educationStandards: {
            type: String,
        },
        videoPreviewData: {
            type: String
        },
        reviewsTotal: {
            type: Number
        }
    },
    vendor: {
        type: mongoose.ObjectId,
        ref: 'Vendor'
    }

})

const Product = mongoose.model('Product', productSchema)
module.exports = Product