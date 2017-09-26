var express = require("express");
var friendsArray = require("../data/friends.js");
var bestMatch = 50;
var friendIndex = 0;

module.exports = function(app) {
    // Reset BestMatch value to 50 for each Post
    function resetVals() {
        bestMatch = 50;
    }

    // Function to set friendIndex to index value
    function friendIndexed(i) {
        return friendIndex = i;
    }
    
    // Function to set matchVal and call friendIndexed
    function findBestIndex(res, i, matchVal) {
        // Checks if matchVal is less than or equal to bestMatch and then calls friendIndexed to set friendIndex to i
        if(matchVal <= bestMatch) {
            friendIndexed(i);
            bestMatch = matchVal;
            if(i >= friendsArray.length-1) {
                // Sends friendsArray with friendIndex back to the browser
                res.send(friendsArray[friendIndex]);
            }
        }else {
            if(i >= friendsArray.length-1) {
                // Sends friendsArray with friendIndex back to the browser
                res.send(friendsArray[friendIndex]);
            }
        }
        
    }

    // Function with req and i so that the loop can't pass without finishing the further steps
    function insideLoop(req,res,i) {
        // Initialize matchVal for adding up each questions values, friendIndex for logging the index of the best match
        var matchVal = 0;
        // Initializes bestMatch at 50, so that if the total matchVal over 10 questions is 50 it will still selecta best match
        for(var j = 0; j < 10; j++) {
            matchVal += Math.abs(req.body.scores[j] - friendsArray[i].scores[j]);
        }
        findBestIndex(res, i, matchVal);
    }

    app.get("/api/friends", function(req,res) {
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req,res) {
        // Runs a for loop through the friends Array
        resetVals();
        for(var i = 0; i < friendsArray.length; i++) {
            insideLoop(req,res,i);
        }
    });
}