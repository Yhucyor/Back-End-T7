const mongoose = require('mongoose');

const scheme = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 0  
        }
    },
    {
        timestamps: true // Tu dong sinh ra truong CreateAt va UpdateAt 
    }
);
const ForgotPassword = mongoose.model("ForgotPassword", scheme, "forgot-password"); 

module.exports = ForgotPassword;