var ntwitter = require("ntwitter"),
    redis = require("redis"),
    credentials = require("./credentials.json"),
    twitter,
    client,
    redisClient,
    counts = {};

client = redis.createClient();
client.mget(["awesome","cool","groovy"], function(err, results){
    if(err !== null) {
        console.log("ERR" + err);
        return;
    }
    counts.awesome = parseInt(results[0],10)||0;
    counts.cool = parseInt(results[1],10)||0;
    counts.groovy = parseInt(results[2],10)||0;
});

twitter = ntwitter(credentials);
twitter.stream(
    "statuses/filter",
    {"track" : ["awesome","cool","rad","gnarly","groovy"]},
    function (stream) {
        stream.on("data", function (tweet) {
            if(tweet.text.indexOf("awesome")>-1){
                client.incr("awesome");
                counts.awesome+=1;
            }
            if(tweet.text.indexOf("cool")>-1){
                client.incr("cool");
                counts.cool+=1;
            }
            if(tweet.text.indexOf("groovy")>-1){
                client.incr("groovy");
                counts.groovy+=1;
            }
        });
    }
);
setInterval(function () {
    console.log(counts.awesome);
}, 3000);
module.exports = counts;