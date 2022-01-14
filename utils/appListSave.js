const { successFlag, error } = require("../http/baseResponse");
const { isEmptyObject } = require("./tools");
const dbAppList = require('../db/model/AppListModel');

exports.saveAppList = (req, res) => {
    let body = req.body
    console.log("------>>>>req,body", body);
    if (!isEmptyObject(body)) {
        //查询自增
        dbAppList.find({ id: { $gte: 0 } }).sort({ id: -1 }).limit(1)
            .then((data, err) => {
                let id = data.length > 0 ? (++(data[0].id)) : 0
                // http://localhost:3000/uploads//970552e6aa354c346ec88783954bc001.apk
                let app = new dbAppList({
                    id: id, //自增id,
                    icon: body.icon,
                    versionCode: body.versionCode,
                    versionName: body.versionName,
                    platform: body.platform,
                    desc: body.appDesc,
                    uploadTime: Date.now(),
                    size: body.fileSize,
                    downloadPath:body.path,
                    appName:body.label,
                    appId: body.appId,//和lc_apps表关联的id
                })
                console.log("----->app=", app);
                app.save((err) => {
                    if (err) {
                        res.send(error(err))
                    } else {
                        res.send(successFlag("添加成功"))
                    }
                })
            })
    } else {
        res.send(error("请求参数为空"))
    }
}