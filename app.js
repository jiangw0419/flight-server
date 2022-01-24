var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var fileRouter = require('./routes/file');
var appRouter = require('./routes/apps');
var appListRouter = require('./routes/applist');
var roleRouter = require('./routes/role');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


// 跨域设置
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);
app.use('/app', appRouter);
app.use('/appList', appListRouter);
app.use('/role', roleRouter);

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//     console.log('Express server listening on port ' + port);
// });

module.exports = app;
