var express = require('express');
var fs = require('fs');
const { request } = require('http');
const { RequestTimeout } = require('http-errors');
var path = require('path');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('home')
});

app.post('/deploy',function(req,res){
  var tname = req.body.tokenname
  var tsym = req.body.tokensym
  var tsupp = req.body.initsupp

  console.log(tname,tsym,tsupp)
})






app.listen(3000);
