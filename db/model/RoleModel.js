const mongoose = require("../db")
//app相关
const Role = mongoose.model('lc_role', new mongoose.Schema({
    id: Number, //自增id,
    userId:String,//用户关联id
    role:String,//角色 1管理员 2普通成员
    roleDesc:String,
}), 'lc_role')

module.exports = Role
