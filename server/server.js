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
//5、 default:static
server.use(express.static('static'))

server.listen(8081);