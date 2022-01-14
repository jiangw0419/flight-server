const mongoose = require("../db")
//用户相关
const User = mongoose.model('lc_user',new mongoose.Schema({
    // "_id" : ObjectId("61d6576ae8487c14992c3d50"),
    account : String,
    password : String,
    name : String,
    age : String,
    sex : String,
    role:String
}),'lc_user')

module.exports = User