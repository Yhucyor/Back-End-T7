const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

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
        slug: {
            type: String,
            slug: "name", // Slug này cố định 
            unique: true
        },
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