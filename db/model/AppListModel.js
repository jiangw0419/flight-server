const mongoose = require("../db")
//app相关
const Apps = mongoose.model('lc_app_list', new mongoose.Schema({
    id: Number, //自增id,
    icon: String,
    versionCode:String,
    versionName:String,
    platform:String,
    desc:String,
    uploadTime:Date,
    size:String,
    downloadPath:String,
    appId:String,//和lc_apps表关联的id
    appName:String,
    account:String,//上传的用户账号
}), 'lc_app_list')

module.exports = Apps
