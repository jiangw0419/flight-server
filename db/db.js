const mongoose = require("mongoose")
const database_url = 'mongodb://adroot:adroot@43.128.11.73:27017/lc_user?authSource=admin'
mongoose.connect(database_url,function(err,db){
    // console.log("--数据库链接成功----->>",err,db);
})
module.exports = mongoose

