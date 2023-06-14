const express = require("express");
const bodyParser= require("body-parser");

const app= express();

let items=['sleep well','eat food'];
let newWorkItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    let options={weekday:'long' , month: 'long' , day: 'numeric'};
    let today=new Date();
    let day=today.toLocaleDateString("en-US",options);
    res.render('list',{listTitle: day, newItems: items});
});

app.post('/',function(req,res){
    let item=req.body.newItem;
    if(req.body.list==='Work'){
        newWorkItems.push(item);
        res.redirect('/work');
    }else{
    items.push(item);
    res.redirect("/");
    }
})

app.get('/work',function(req,res){
    res.render("list",{listTitle:'Work',newItems: newWorkItems});
})
app.get('/about',function(req,res){
    res.render("about");
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
});