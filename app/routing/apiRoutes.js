var friendsArray = require("../data/friends.js");

module.exports = function(app) {
    // Function with req and i so that the loop can't pass without finishing the further steps
    function insideLoop(req,i) {
        // Initialize matchVal for adding up each questions values, friendIndex for logging the index of the best match
        var matchVal = friendIndex = 0;
        // Initializes bestMatch at 50, so that if the total matchVal over 10 questions is 50 it will still selecta best match
        var bestMatch = 50;
        for(var j = 0; j < 10; j++) {
            matchVal += Math.abs(req.body.scores[j] - friendsArray[i].scores[j]);
        }
        if(matchVal <= bestMatch) {
            friendIndex = i;
            bestMatch = matchVal;
        }
    }

    app.get("/api/friends", function(req,res) {
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req,res) {
        console.log(req.body);
        // Runs a for loop through the friends Array
        for(var i = 0; i < friendsArray.length; i++) {
            insideLoop(req,i);
        }
    });
}