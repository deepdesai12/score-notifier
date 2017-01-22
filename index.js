var express = require('express');
var cheerio = require('cheerio');
var request = require('request');

var app = express();
var port = 30015;




// app.get('/',function(err, res){

var url = 'http://www.espncricinfo.com/ci/engine/match/index.html';
request(url, function(err, response, html){
  //res.send(html);
var $ = cheerio.load(html);

// var text = $('.innings-1-score', '.team-1-name', '.large-13 medium-13 columns innings-information','.row brief-summary').text();
var data = $('div.innings-info-1, div.innings-info-2').filter(function(){

return $(this).text().trim().includes('Australia');



});

var team1score = data.text().split(" ")[4] + data.text().split(" ")[5] + " overs)";

// res.send(html);
console.log(team1score);
console.log(data.next().text());
console.log("Heellooo");
});
// });



app.listen(port);
console.log("Port set to " + port);
