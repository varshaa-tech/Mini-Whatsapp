const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chats")

// app.set("views",path.join(__dirname,"views"));
// app.set("view engine","ejs");

main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


Chat.insertMany([
  {
    from: "Neha",
    to: "Priya",
    msg: "Send me your exam sheets",
    created_at: new Date()
  },
  {
    from: "Priya",
    to: "Neha",
    msg: "I’ll send them tonight.",
    created_at: new Date()
  },
  {
    from: "Amit",
    to: "Neha",
    msg: "Are you coming to class today?",
    created_at: new Date()
  },
  {
    from: "Neha",
    to: "Amit",
    msg: "Yes, I’ll be there by 10.",
    created_at: new Date()
  },
  {
    from: "Priya",
    to: "Amit",
    msg: "Can you help with the assignment?",
    created_at: new Date()
  },
  {
    from: "Amit",
    to: "Priya",
    msg: "Sure, let’s do it together.",
    created_at: new Date()
  }
])
.then(res => {
  console.log("Chats inserted:", res);
})
.catch(err => {
  console.error("Error inserting chats:", err);
});

