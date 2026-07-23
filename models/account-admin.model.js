const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    status: String // Trạng thái của tài khoản 
})
const AccountAdmin = mongoose.model("AccountAdmin", scheme, "accounts-admin"); 

module.exports = AccountAdmin;