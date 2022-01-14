var express = require('express');
var router = express.Router();
const fs = require("fs")//fs模块修改文件名
const pathLib = require('path')
const bodyParser = require('body-parser')
const multer = require('multer'); // v1.0.5
const { error, success } = require('../http/baseResponse');
const upload = multer({ dest: './public/data/uploads/' })
const { saveAppList } = require('../utils/appListSave');
const { isAndroid, isIOS } = require('../utils/tools');



router.use(upload.any())// //允许上传什么类型文件,any 代表任何类型
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()) // for parsing application/json

router.post('/fileUpload', function (req, res) {
    let body = { ...req.body }
    console.log("---------->>>body=", body);
    let files = req.files
    if (files.length > 0) {
        let file = files[0]
        const fileName = file.path + pathLib.parse(file.originalname).ext
        fs.rename(file.path, fileName, function (err) {
            //保存成功，记录存库
            let fileSize = file.size
            let path = fileName.split("public/")[1]
            let platform = isAndroid(fileName) ? "1" : isIOS(fileName) ? "2" : "-1"
            req.body = { ...req.body, fileSize, path, platform }
            saveAppList(req, res)
        })
    } else {
        res.send(error("文件为空"))
    }
});

module.exports = router;
