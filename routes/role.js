var express = require('express')
const dbRole = require('../db/model/RoleModel')
const { success, error } = require('../http/baseResponse.js');
var router = express.Router();

/**
 * 所有的post网络请求都只接受body/json格式
 */

router.post('/queryRoleByUser', (req, res, next) => {
    let body = req.body
    let userId = body.userId
    if(userId){
        dbRole.find({userId}, function (err, data) {
            res.send(success(data))
        })
    }else{
        res.send(res.send(error("用户id不能为空")))
    }
})
module.exports = router
