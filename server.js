var express = require("express"),
    tweetCounts = require("./tweet_counter.js"),
    http = require("http"),
    app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
app.get("/counts.json", function (req, res) {
    res.json(tweetCounts);
});

