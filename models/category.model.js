const mongoose = require('mongoose');

const scheme = new mongoose.Schema(
    {
        name: String,
        parent: String, 
        position: Number,
        status: String, 
        avatar: String,
        description: String,
        createdBy: String,
        updatedBy: String,
        slug: String,
        deleted: {
            type: Boolean, 
            default: false
        },
        deletedBy: String,
        deletedAt: Date
    },
    {
        timestamps: true // Tu dong sinh ra truong CreateAt va UpdateAt 
    }
);
const Category = mongoose.model("Category", scheme, "categories"); 

module.exports = Category;