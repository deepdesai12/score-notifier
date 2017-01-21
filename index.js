var express = require('express');
var cheerio = require('cheerio');
var request = require('request');

var app = express();
var port = 30015;




app.get('/',function(err, res){

var url = 'http://www.espncricinfo.com/new-zealand-v-bangladesh-2016-17/engine/match/1019987.html';
request(url, function(err, response, html){
  res.send(html);

});
});

app.listen(port);
console.log("Port set to " + port);
