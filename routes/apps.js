var express = require('express')
const dbApps = require('../db/model/AppModel');
const { success, error, successFlag, errorFlag } = require('../http/baseResponse.js');
const { isEmptyObject: isEmpty, isEmptyText, isEmptyObject } = require('../utils/tools.js');
var router = express.Router();

/**
 * 所有的post网络请求都只接受body/json格式
 */

///查询app列表
router.post('/queryAllApps', (req, res, next) => {
    dbApps.find({}, function (err, data) {
        console.log("00000000000>>>>>>", data);
        res.send(success(data))
    })
})

///根据id查询app信息
router.post('/queryAppById', (req, res) => {
    let body = req.body
    let id = body.id
    if (!isEmptyText(id)) {
        dbApps.find({ "id": id }, (err, data) => {
            console.log("------>>>queryAppById", err, data);
            if (!err) {
                res.send(success(data))
            } else {
                res.send(error(err))
            }
        })
    } else {
        res.send(error("bundId & packageName cannot be empty"))
    }
})

///创建app
router.post('/addApp', (req, res) => {
    let body = req.body
    if (!isEmpty(body)) {
        //bundId 和 packageName 唯一
        dbApps.count({ $or: [{ "bundId": body.bundId }, { "packageName": body.packageName }] }, (err, data) => {
            console.log("------->>>>", err, data);
            if (err) {
                console.log("------err->>>>", err, data);
                res.send(error(err))
            } else {
                if (data === 0) {
                    //查询自增
                    dbApps.find({ id: { $gte: 0 } }).sort({ id: -1 }).limit(1)
                        .then((data, err) => {
                            console.log("---data=", data, err);
                            let id = data.length > 0 ? (++(data[0].id)) : 0
                            let app = new dbApps({
                                appName: body.appName,
                                appDesc: body.appDesc,
                                packageName: body.packageName,
                                bundId: body.bundId,
                                id: id
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
                    res.send(error("已有相关app信息，请重新创建"))
                }
            }
        })

    } else {
        res.send(error("请求参数为空"))
    }
})

///更新app数据
router.post('/updateAppById', (req, res) => {
    let body = req.body
    if (!isEmptyObject(body)) {
        let id = body.id
        let appName = body.appName
        let appDesc = body.appDesc
        dbApps.updateOne({ id: id }, { $set: { appName: appName, appDesc: appDesc } }, (err, data) => {
            if (err) {
                res.send(error(err))
            } else {
                console.log("00---data=",data);
                res.send(successFlag("修改成功"))
            }
        })
    } else {
        res.send(error("请求参数为空"))
    }
})


module.exports = router
