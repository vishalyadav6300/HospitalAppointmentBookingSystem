const exp=require("express");

const app=exp();
const mongodbclient=require('mongodb').MongoClient;
//importing express async handler
const expressAsyncHandler=require('express-async-handler');
//importing bcryptjs
const bcryptjs=require("bcryptjs");
//importing jsonwebtoken
const jwt=require('jsonwebtoken');

const path=require('path');


app.use(exp.json());
app.use(exp.static(path.join(__dirname,'./dist/APPOINTMENTSYSTEM/')));


let dburl="DATABASE URL";
let databaseObj;
let appointmentCollectionObj,loginCollectionObj,usersCollectionObj;
mongodbclient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error)
    console.log("Error in db connection",error);
    else
    {
        databaseObj=client.db("Hospital");
        appointmentCollectionObj=databaseObj.collection("appointments");
        loginCollectionObj=databaseObj.collection("login");
        usersCollectionObj=databaseObj.collection("users");
        app.set("appointmentCollectionObj",appointmentCollectionObj);
        console.log("connected to database");
    }
})

//login for admin
app.post("/login/admin",expressAsyncHandler(async (req,res)=>{
    let loginObj=req.body;
    //console.log(loginObj);
    let Login=await loginCollectionObj.findOne({$and:[{username:loginObj.username},{password:loginObj.password}]});
    if(Login===null)
    res.send({message:"Invalid Access!!!"})
    else
     res.send({message:"login successful for admin!!!"});  
}))
//login for user
app.post('/login/user',expressAsyncHandler (async (req,res)=>{
    let user=req.body;
    let userObj=await usersCollectionObj.findOne({username:user.username})
    if(userObj===null)
        res.send({message:"username is invalid"});
    else{
        let result=await bcryptjs.compare(user.password,userObj.password);
        if(result===false)
         res.send({message:"password is incorrect"});
        else
         res.send({message:"login successfull!!!",userdetails:userObj});
    }
}))

app.post('/createAccount',expressAsyncHandler (async (req,res)=>{
    let userObj=req.body;
    let user=await usersCollectionObj.findOne({username:userObj.username});
    if(user===null)
    {
        let hashedPassword = await bcryptjs.hash(userObj.password, 7);
        userObj.password=hashedPassword;
        await usersCollectionObj.insertOne(userObj);
        res.send({message:"user created successfully"});
    }
    else
        res.send({message:"username already exist"});
}))

app.post("/appointment",expressAsyncHandler (async (req,res)=>{
    let appObj=req.body;
    let app=await appointmentCollectionObj.findOne({$and:[{email:appObj.email},{appointdate:appObj.appointdate},{timeint:appObj.timeint},{username:appObj.username}]});
    if(app===null)
    {
        await appointmentCollectionObj.insertOne(appObj);
        res.send({message:"Appointment created successfully"});
    }
    else
        res.send({message:"Appointment already exist"});
}))

app.get("/appointmentdetails",expressAsyncHandler( async(req,res)=>{
    let appoint=await appointmentCollectionObj.find().sort({"points":-1}).toArray();
    //console.log(appoint);
    res.send({message:appoint});
}))

app.get("/getuserappinfo/:username",expressAsyncHandler(async(req,res)=>{
    let un=req.params.username;
    let appObjs=await appointmentCollectionObj.find({username:un}).toArray();
    if(appObjs===null)
    res.send({message:"No appointments"});
    else
    res.send({message:appObjs});
}))
app.put('/updateApp',expressAsyncHandler(async (req,res)=>{
    let updateObj=req.body;
    await appointmentCollectionObj.updateOne({$and:[{username:updateObj.username},{patientname:updateObj.patientname}]},{$set:{approve:updateObj.approve}});
    res.send({message:"Appointment updated successfully!!!"});
}))
app.delete('/delete/:email',expressAsyncHandler(async(req,res)=>{
    let Obj=req.params;
    await appointmentCollectionObj.deleteOne({email:Obj.email});
    res.send({message:"deleted successfully"});
}))

app.get('/details/:username',expressAsyncHandler(async(req,res)=>{
    let un=req.params;
    console.log(un);
    let userObj=await usersCollectionObj.findOne({username:un.username});
    if(userObj===null)
        res.send({message:"no user found"});
    else
        res.send({message:userObj});
}))

app.get('/verify/:userObj',expressAsyncHandler(async(req,res)=>{
    let uObj=req.params;
    let userCred=uObj['userObj'].split("-");
    //console.log(userCred[0]+'   '+userCred[1]);
    let usersObj=await usersCollectionObj.findOne({username:userCred[0]});
    let appObj=await appointmentCollectionObj.findOne({username:userCred[0]});
    //console.log(usersObj);
    if(usersObj===null)
    res.send({message:"user doesnot found"});
    else if(appObj!==null)
    res.send({message:"appointment already created"});
    else{
        let result=await bcryptjs.compare(userCred[1],usersObj.password);
        if(result===false)
        res.send({message:"password invaild!!!"});
        else
        res.send({message:"user found"});
    }
}))
const port=3001;
app.listen(port,()=>console.log(`server on port ${port}...`));
