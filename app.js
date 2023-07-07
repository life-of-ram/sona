//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
require('dotenv').config();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const uri = process.env.ATLAS_URI;
console.log(uri)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", function(){
  console.log("MongoDB database connection established successfully");
});

var userSchema = new mongoose.Schema({
  Username: {type: String},
  Email: {type: String, unique: true,},
  Pwd: {type: String},
});

var User = mongoose.model("User", userSchema);

app.get("/", function(req, res){

    res.render("home", {
      startingContent: homeStartingContent,
      });
  });

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.post("/signUp", function(req, res){
  Name = req.body.name;
  signUpEmail = req.body.email;
  signUpPwd = req.body.password;
  const user = new User({
    Username: Name,
    Email: signUpEmail,
    Pwd: signUpPwd,
  });
  user.save();
});

app.post("/login", function(req, res){
  loginEmail = req.body.email;
  loginPwd = req.body.password;
  User.findOne({Email: loginEmail}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      if (found && found.Pwd === loginPwd) {
        res.send("Survey Page");
      } else {
        console.log("oops");
      }
    }});


    
  // if (User.exists({Email: loginEmail})) {
  //   console.log("exists");
  // } else {
  //   console.log("oops");
  // }
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
