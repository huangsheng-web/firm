const express = require('express');
// const static = require('express-static');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var server = express();
var db = mysql.createConnection({host:'sql.s1119.vhostgo.com',user:'hsdying',password:'r68h4v3g',database:'hsdying'});
//1、获取请求数据
//get自带
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({extended:false}));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//2、cookie,session
server.use(cookieParser());

server.post('/userInfo', function (req, res) {
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  db.query(`INSERT INTO user_info (name,phone,time) VALUES ('${req.body.name}','${req.body.phone}', '${req.body.time}')`,(err,data)=>{
    if(err){
      res.status('500').send('database err').end();
    } else {
      res.end(JSON.stringify(result))
    }
  })
})
server.post('/login', (req, res) => {
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  db.query(`SELECT * FROM user`,(err,data)=>{
    if(err){
      res.status('500').send('database err').end();
    } else {
      if (req.body.userMobile === data[0].accout && req.body.userPassword === data[0].pass) {
        res.end(JSON.stringify(result))
      } else {
        result.message = '账号或者密码错误';
        result.code = '00000001'
        res.end(JSON.stringify(result))
      }
    }
  })
})
server.post('/updateUserInfo', function (req, res) {
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  db.query(`SELECT * FROM user`,(err,data)=>{
    if(err){
      res.status('500').send('database err').end();
    } else {
      console.log(req.body.oldName, req.body.oldPass, data[0].accout, data[0].pass)
      if (req.body.oldName !== data[0].accout || req.body.oldPass !== data[0].pass) {
        result.message = '原始的账号或者密码错误';
        result.code = '00000001'
        res.end(JSON.stringify(result))
      } else {
        console.log('修改了')
        db.query(`UPDATE user SET accout = '${req.body.newName}' , pass = '${req.body.newPass}'`, (err, data) => {
          if (err) {
            res.status('500').send('database err').end();
          } else {
            result.code = '00000000'
            res.end(JSON.stringify(result))
          }
        })
      }
    }
  })
})
server.get('/userInfo', function (req, res) {
  res.writeHead(200,{ "Content-Type": "text/plain;charset=utf-8;","Access-Control-Allow-Origin":"*" });
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  if (req.query.startTime) {
    db.query(`SELECT * FROM user_info WHERE time > '${req.query.startTime}' and time < '${req.query.endTime}'`, (err, data) => {
      if (err) {
        console.error(err)
        res.status('500').send('database err').end();
      } else {
        result.data = data;
        res.end(JSON.stringify(result))
      }
    })
  } else {
    db.query(`SELECT * FROM user_info`, (err, data) => {
      if (err) {
        console.error(err)
        res.status('500').send('database err').end();
      } else {
        result.data = data;
        res.end(JSON.stringify(result))
      }
    })
  }
})
server.get('/getInfoList', (req, res) => {
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  db.query(`SELECT * FROM info_list`, (err, data) => {
    if (err) {
      console.error(err)
      res.status('500').send('database err').end();
    } else {
      result.data = data;
      res.end(JSON.stringify(result))
    }
  })
})
server.post('/updateInfoList', (req, res) => {
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  db.query(`UPDATE info_list  SET phone = '${req.body.phone}', name = '${req.body.name}' WHERE id = ${req.body.id}`, (err, data) => {
    if (err) {
      console.error(err)
      res.status('500').send('database err').end();
    } else {
      result.data = data;
      res.end(JSON.stringify(result))
    }
  })
})
server.post('/addInfoList', (req, res) => {
  let result = {
    code: '00000000',
    message: '成功',
    data: null
  }
  db.query(`INSERT INTO info_list (name,phone) VALUES ('${req.body.name}','${req.body.phone}')`, (err, data) => {
    if (err) {
      console.error(err)
      res.status('500').send('database err').end();
    } else {
      result.data = data;
      res.end(JSON.stringify(result))
    }
  })
})
//5、 default:static
server.use(express.static('static'))

server.listen(8081);