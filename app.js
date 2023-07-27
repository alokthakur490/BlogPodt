//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
//var posts =[];

const mongoose = require('mongoose');

//
mongoose.connect("mongodb+srv://thakuralok490:thakuralok-490@cluster0.1prvmml.mongodb.net/postDB")


const postSchema = new mongoose.Schema({
  title:  String,
    
   content :String
});

const Post = mongoose.model("Post", postSchema);



const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/",function(req, res){
  Post.find().then((data) => {
    res.render("home",{p:homeStartingContent, posts :data });
  })
  
})

app.get("/about",function(req, res){
  res.render("about",{p:aboutContent});
})
app.get("/contact",function(req, res){
  res.render("contact",{p:contactContent});
})
app.get("/compose",function(req, res){
  res.render("compose");
})
app.post("/compose",function(req, res){
  
  const post = new Post({
    title :req.body.postTitle,
    content : req.body.postBody
    
  });
  post.save();
  console.log(post);
  
   

  
  res.redirect("/");
  
})

app.get("/posts/:postkaId",function(req, res){
 
  const postkaId = req.params.postkaId;
  //console.log(postId);

Post.findOne({_id: postkaId}).then( function(obj) {
  res.render("post",{heading:obj.title,para :obj.content });
 });

});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
