var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var app = express();
var port = 30015;

// app.get('/',function(err, res){

var url = 'http://www.espncricinfo.com/ci/engine/match/index.html';
var accountSid = 'ACcd53fd80682883eae81a182b2604b0bc';
var authToken = '721313605d1dc444bf64f17c2c52f3ad';
var client = require('twilio')(accountSid, authToken);

var args = process.argv.slice(2);
var team1name = args[0];
var team2name = args[1];
var team1, team2, matchstatus;
request(url, function(err, response, html) {
    //res.send(html);
    var $ = cheerio.load(html);
    var json = {
        team1: "",
        team2: "",
        summary: ""
    };
    // var text = $('.innings-1-score', '.team-1-name', '.large-13 medium-13 columns innings-information','.row brief-summary').text();
    var data = $('div.innings-info-1, div.innings-info-2').filter(function() {

        return $(this).text().trim().includes(team1name);



    });
    if (!data.hasClass('innings-info-2')) {
        team1 = data.text();
        team2 = data.next().text().trim();
        matchstatus = data.next().next().text().trim();
    } else {
        team1 = data.prev().text().trim();
        team2 = data.text();
        matchstatus = data.next().text().trim();
    }

    var team1score = team1.split("(")[0];
    var team2score = team2.split("(")[0];

    json.team1 = team1score;
    json.team2 = team2score;
    json.summary = matchstatus;

    //console.log(team1);
    //console.log(team2);
    //console.log(matchstatus);
    fs.readFile('scores.json', function(err, data) {
        if (err) throw err;
        var score = JSON.parse(data);
        var check = false;
        if (score.team1 != team1score || score.team2 != team2score || score.summary != matchstatus) {
            console.log("The scores changed, here is the updated score: ");
            if (score.summary != matchstatus) {
                console.log(json.team1);
                console.log(json.team2);
                console.log(json.summary);
                check = true;
            } else {
                console.log(json.team1);
                console.log(json.team2);
            }
            fs.writeFileSync('scores.json', JSON.stringify(json, null, 4), function(err) {

                console.log('File successfully written!');

            });

            // client.messages.create({
            //     to: "+16477859387",
            //     from: "+16475609124",
            //     body: "The updated score is: " + json.team1 + "\t" + "\n" + json.team2
            // }, function(err, message) {
            //     console.log(message.sid);
            // });
        }
        // res.send(html);

        //console.log("Heellooo");
    });
});





app.listen(port);
console.log("Port set to " + port);
