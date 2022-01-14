var express = require('express')
const dbAppList = require('../db/model/AppListModel');
const { success, error, successFlag, errorFlag } = require('../http/baseResponse.js');
const { saveAppList } = require('../utils/appListSave');
const { isEmptyObject } = require('../utils/tools.js');
var router = express.Router();

/**
 * 所有的post网络请求都只接受body/json格式
 */

///查询app列表，排序,分页
router.post('/queryAppListByAppId', (req, res, next) => {
    let body = req.body
    //默认倒序
    let platform = (Number(body.platform) === 1 || Number(body.platform) === 2) ? { platform: body.platform } : {}
    let appId = body.appId
    let sort = body.sort || -1
    let page = body.page || 1
    page = page - 1
    let pageSize = body.pageSize || 10
    dbAppList.find({ appId: appId, ...platform }, (err, totalData) => {
        if (err) {
            res.send(error(err))
        } else {
            dbAppList.find({ appId: appId, ...platform }).sort({ id: sort }).limit(pageSize).skip(page * pageSize)
                .then(data => {
                    res.send(success({ total: totalData.length, data }))
                }).catch(err => {
                    res.send(error(err))
                })
        }
    })

})

//根据appid查询详情
router.post('/queryAppDetailById', (req, res) => {
    let body = req.body
    let id = body.id
    if (id) {
        dbAppList.find({ id }, (err, data) => {
            if (!err) {
                res.send(success(data[0]))
            } else {
                res.send(error(err))
            }
        })
    } else {
        res.send(error("查询id不能为空"))
    }
})

///添加app
router.post('/addAppList', (req, res) => {
    saveAppList(req, res)
})

///更新app数据
router.post('/updateAppDescById', (req, res) => {
    let body = req.body
    if (!isEmptyObject(body)) {
        let id = body.id
        let desc = body.desc
        dbAppList.updateOne({ id: id }, { $set: { desc: desc } }, (err, data) => {
            if (err) {
                res.send(error(err))
            } else {
                console.log("--updateAppDescById---->>>data", data);
                res.send(successFlag("修改成功"))
            }
        })
    } else {
        res.send(error("请求参数为空"))
    }
})

module.exports = router
