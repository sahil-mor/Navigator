var express = require("express");
var request = require("request")
var bodyParser = require("body-parser")
var app = express();

var apiKey = "" //write your apiKey here

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"));
app.get("/",function(req,res){
    res.render("home")
})

app.get("/getLocation/:latitude/:longitude",function(req,res){
    url = "https://api.opencagedata.com/geocode/v1/json?q=" + req.params.latitude + "+" + req.params.longitude + "&key=" + apiKey;
    request(url,function(error,response,body){
        if(!error){
            parsedData = JSON.parse(body)
            res.render("getLocation",{Data : parsedData})
        }else{
            console.log(error)
            res.render("index")
        }
    })
})

app.post("/searchLocation",function(req,res){
    url = "https://api.opencagedata.com/geocode/v1/json?q=" + req.body.place + "&key=" + apiKey
    request(url,function(error,response,body){
        if(!error){
            parsedData = JSON.parse(body)
            res.render("searchLocation",{Data : parsedData})
        }else{
            console.log(error)
            res.render("index")
        }
    })
})

app.listen(1000,function(){
    console.log("SERVER LISTENING 1000")
})