//requires modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//dummy data
const homeStartingContent =
  "This is the home page (landing page) of this blog website. This section is the default content as well as the start content of the home page. All of the other user posts will be displayed below including the title and the content. If the content exceeds 100 characters long, only part of the content will be displayed and you will have to click on 'Read More' button in order to view the whole story. If you would like to add a new post, please click on the 'Add New Post' button. Enjoy and have fun! 😁";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//initial express
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//an array to store all the posts
let posts = [];

//Home Page - Get
app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent, posts: posts });
});

//About Page - Get
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

//Contact Page - Get
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

//Compose Page - Get
app.get("/compose", function (req, res) {
  res.render("compose");
});

//Compose Page - Post
app.post("/compose", function (req, res) {
  //retrieve and store user input
  const post = {
    title: req.body.inputTitle,
    content: req.body.inputPost,
  };

  posts.push(post);

  res.redirect("/");
});

//Individual Post Route
app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const postTitle = _.lowerCase(post.title);

    //check if the post title matches the route param
    if (postTitle === requestedTitle) {
      res.render("post", { post: post });
    }
  });
});

//setup port
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
