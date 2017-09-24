var path = require("path");

module.exports = function(app) {

    // Specific routing for Survey!
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // Catch all for Routes not known above
    app.get("*", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}