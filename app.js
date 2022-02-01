const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var blogPosts = [];

app.get("/", function(req, res) {

    res.render("blog", {
        blogPosts : blogPosts,
    });
})

app.get("/about", function(req, res) {

    res.render("about", {
        blogPosts : blogPosts,
    });
})

app.get("/posts", function(req, res) {
    
    res.redirect("allposts");
})

app.get("/allposts", function(req, res) {

    res.render("allposts", {
        blogPosts : blogPosts,
    })
})

app.post("/", function(req, res) {

    if (req.body["postTitle"] > "" && req.body["postBody"] > "") {
        let postTitle = req.body["postTitle"];
        let postBody = req.body["postBody"];

        blogPosts.push([postTitle, postBody]); 
    }

    res.redirect("/");
})

app.post("/about", function(req, res) {

    res.redirect("about");
})

app.post("/posts", function(req, res) {

    let postIndex = parseInt(req.body["postIndex"]);

    if (typeof postIndex === "number") {

        let postTitle = blogPosts[postIndex][0];
        let postBody = blogPosts[postIndex][1];

        res.render("posts", {
            postTitle : postTitle,
            postBody : postBody,
        })
    }
    else res.redirect("allposts");
})

app.post("/allposts", function(req, res) {
    res.redirect("allposts");
})

app.listen(3000, function() {
    console.log("Listening on 3000");
})

function getThisPost(postIndex) {

    
}