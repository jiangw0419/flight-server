var express = require('express')
const dbUser = require('../db/model/UserModel')
const { success, error } = require('../http/baseResponse.js');
const { isEmptyObject: isEmpty } = require('../utils/tools.js');
var router = express.Router();

/**
 * 所有的post网络请求都只接受body/json格式
 */
router.post('/queryAllUser', (req, res, next) => {
    dbUser.find({}, function (err, data) {
        res.send(success(data))
    })
})

router.post('/queryUserByName', (req, res, next) => {
    dbUser.find({ name: req.body.name }, function (err, data) {
        console.log("00000000000>>>>>>", data);
        res.send(success(data))
    })
})


router.post('/queryUserByParams', (req, res, next) => {
    let body = req.body
    if (!isEmpty(body)) {
        dbUser.find(req.body, function (err, data) {
            res.send(success(data))
        })
    } else {
        res.send(error("json body is empty"))
    }
})

router.post('/addUser', (req, res, next) => {
    let body = req.body
    if (!isEmpty(body)) {
        var user = new dbUser({
            account: body.account,
            password: body.password,
            name: body.name,
            age: body.age,
            sex: body.sex
        })
        //先查询account
        dbUser.count({ account: user.account }, (err, data) => {
            if (data) {
                res.send(error("该用户已经存在"))
            } else {
                //添加数据
                user.save((err) => {
                    if (err) {
                        console.log("save user fail  ---->", err);
                        res.send(error("failed " + err))
                    } else {
                        console.log("save success");
                        res.send(success("success"))
                    }
                })
            }
        })
    } else {
        res.send(error("json body is empty"))
    }
})




module.exports = router
