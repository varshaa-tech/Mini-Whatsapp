const express= require("express");
const app =express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chats");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let chat1= new Chat({
    from:"neha",
    to:"priya",
    msg:"send me your exam sheets",
    created_at:new Date()
});

// chat1.save().then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

// INDEX ROUTE

app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    newChat.save().then(res=>{
        console.log("Chat was saved");
    }).catch(err=>{
        console.log(err);
    })
    console.log(newChat);
    res.redirect("/chats");
    // res.render("New Chats");

});

// const Chat = require("./models/chats");

// Show edit form
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update chat
app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { from, to, msg } = req.body;

  await Chat.findByIdAndUpdate(id, {
    from,
    to,
    msg,
    created_at: new Date()
  });

  res.redirect("/chats");
});


app.get("/",(req,res)=>{
    res.send("root is working");
});
// Destroy route
app.delete('/chats/:id', async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  res.redirect('/chats');
}); 

app.listen(8080,()=>{
    console.log("SERVER is listening on port :8080");
});