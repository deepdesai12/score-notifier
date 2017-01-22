var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var app = express();
var port = 30015;




// app.get('/',function(err, res){

var url = 'http://www.espncricinfo.com/ci/engine/match/index.html';

request(url, function(err, response, html){
  //res.send(html);
var $ = cheerio.load(html);
var json = {team1: "", team2: "", summary: ""};
// var text = $('.innings-1-score', '.team-1-name', '.large-13 medium-13 columns innings-information','.row brief-summary').text();
var data = $('div.innings-info-1, div.innings-info-2').filter(function(){

return $(this).text().trim().includes('Australia');



});
var team1 =  data.text();
var team2 = data.next().text().trim();
var matchstatus = data.next().next().text().trim();

var team1score = team1.split("(")[0];
var team2score = team2.split("(")[0];

json.team1 = team1score;
json.team2 = team2score;
json.summary = matchstatus;


fs.writeFile('scores.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written!');

});
// res.send(html);
console.log(team1score);
console.log(data.next().text());
console.log(matchstatus);
console.log("Heellooo");
});
// });





app.listen(port);
console.log("Port set to " + port);
