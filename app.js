const express = require("express");
const bodyParser = require("body-parser");
const dataHandler = require(__dirname + "/data.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var blogPosts = [];

app.get("/", function(req, res) {

    findAllPostsAndRender("blog", res);
})

app.get("/about", function(req, res) {

    res.render("about");
})


app.get("/posts", function(req, res) {

    res.redirect("allposts");
})


app.get("/posts/:postId", function(req, res) {
    
    const postId = req.params.postId;
    findOnePostAndRender(postId, "posts", res)
})


app.get("/compose", function(req, res) {
    
    res.render("compose");
})


app.get("/allposts", function(req, res) {

    findAllPostsAndRender("allposts", res);
})


app.post("/", function(req, res) {

    if (req.body["postTitle"] > "" && req.body["postBody"] > "") {
        let postTitle = req.body["postTitle"];
        let postBody = req.body["postBody"];

        let newPost = {
            title: postTitle,
            body: postBody,
        }

        dataHandler.uploadPost(newPost);
    }

    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on 3000");
})


const findAllPostsAndRender = async (renderParam, res) => {
    
    const blogPosts = await dataHandler.findAllPosts();
    console.log(blogPosts);

    res.render(renderParam, {
        blogPosts : blogPosts,
    })
}
const findOnePostAndRender = async (postId, renderParam, res) => {

    const post = await dataHandler.findPost(postId);

    const postTitle = post.title;
    const postBody = post.body;

    res.render(renderParam, {
        postTitle : postTitle,
        postBody : postBody,
    })
}
