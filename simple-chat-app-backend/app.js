const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const cors = require("cors");

//router imports 
const userRouter = require('./routers/userRoutes');
const messagerRoute = require('./routers/messagerRoutes');
const conversationRoute = require('./routers/conversationRoutes');
const bodyParser = require('body-parser');



const io = new Server(server,{
      cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
      }
    });
const port =8080;
const mongoURI = "mongodb://localhost:27017/chattingAPP";

mongoose.connect(mongoURI,()=>{
 console.log('mongodb database connected successfully');
},err=>{
  console.log("error in database",err);
})



app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());

// middlewares
app.use("/users",userRouter);
app.use("/messager",messagerRoute);
app.use("/conversation",conversationRoute);






// socket part 

let users = [];
 
const addUser = (userID,socketID) =>{
  !users.some(user=>user.user_id === userID ) && 
  users.push({
    user_id:userID,
    socketid:socketID
  })
  // console.log("userid",users);
}
const removeUser = (socketID)=>{
  users = users?.filter(user=>user.socketid !== socketID);
  // console.log("userid",users);
}

// const getuser = (userID)=>{
//   console.log("userid",userID);
//    return users.find(user=>user.userID === userID);
// }



io.on('connection', (socket) => {
  // console.log("socket.id",socket.id);
  // console.log("user connected !!!!");
  // console.log("users",users);
  socket.on("addusers",(userID)=>{
    // console.log("userId",userID)
     addUser(userID,socket.id);
     socket.emit("getusers",users)
     
  })
  socket.on('sendMessage', ({ sender_id, reciever_id, text}) => {
    // console.log(reciever_id,sender_id,text);
     const recieverid = users.find(user=>user.user_id === reciever_id);
     const senderid = users.find(element=>element.user_id == sender_id);
    //  console.log("user",user);
    if(recieverid?.socketid != undefined && senderid?.socketid != undefined){
      io.to(recieverid.socketid).to(senderid.socketid).emit('receiveMessage',{
        sender_id,
        text
      });
    }
    else{
      if(senderid?.socketid != undefined)
      io.to(senderid.socketid).emit('receiveMessage',{
        sender_id,
        text
      });
    }
   
  });

  

  //disconnect socket
  socket.on('disconnect',(data)=>{
  //  console.log(" user disconnect !!!!");
   removeUser(socket.id);
   socket.emit("getusers",users);
  })
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});