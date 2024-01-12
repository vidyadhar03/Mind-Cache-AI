const express = require("express");
const app = express();
app.use(express.json());
const { auth } = require("./middleware");
const { ChatSession, ChatMessage } = require("./models/schemas");

// app.post("/chat",auth,async (req,res)=>{
//     const {userid,sessionid,userinput} = req.body

//     //check if sessions already exists for user
//     try{

//     const found = await Chat.findOne({userID:userid})
//     if(found){
//         //check if the session id exists already in user sessions
//         const user_sessions = found.sessions
//         const f = user_sessions.find((local_sesh)=>(local_sesh._id===sessionid))

//     }

//     }catch(e){
//         console.log(e)
//     }

// })

app.get("/chatsessions/:userid",auth,async (req,res)=>{
    const userid = req.params.userid
    try{
        const found = await ChatSession.findOne({userID:userid})
        if(found){
            res.status(200).json({message:"success",data:found.sessions})
        }else{
            res.status(200).json({message:"success",data:[]})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Internal server error"})
    }
})

app.get("/chatmessages/:sessionid",auth,async (req,res)=>{
    const sessionid = req.params.sessionid
    try{
        const found = await ChatMessage.findOne({sessionID:sessionid})
        if(found){
            res.status(200).json({message:"success",data:found.messages})
        }else{
            res.status(200).json({message:"success",data:[]})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Internal server error"})
    }
})

app.post("/editchatsession",auth,async (req,res)=>{
    const {userid,sessionid,edit,del} = req.body
    try{
        const found = await ChatSession.findOne({userID:userid})
        let local_sesh = found.sessions
        const index = local_sesh.findIndex((sesh)=>(sesh._id===sessionid))
        if(del==="yes"){
            local_sesh.splice(index,1)
        }else{
            local_sesh[index].sessionTitle=edit
        }
        found.sessions=local_sesh
        await found.save()
        res.status(200).json({message:"Session Updated"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Internal server error"})
    }
})


