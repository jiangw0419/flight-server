const mongoose = require("../db")
//app相关
const Apps = mongoose.model('lc_apps',new mongoose.Schema({
    appName:String,
    appDesc:String,
    packageName:String,
    bundId:String,
    id:Number //自增id
}),'lc_apps')




module.exports = Apps
