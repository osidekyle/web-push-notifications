const express=require("express");
const webpush=require("web-push");
const bodyParser=require("body-parser");
const path=require("path");

const app =express();

app.use(express.static(path.join(__dirname,"client")))

app.use(bodyParser.json())

const publicVapidKey='BK6mjonVcOwnQUlpYqvassHgKPzmKyKO23K2ebF0UIHWpM6ruCn3bcauk9XR-BX_4KpDY0I7I7vvzwHFMjsz-kM';
const privateVapidKey='RvAYFhXsGLJVlOs42KlMJQr_PW_Q-7qLiICR72RFINs';

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey)

app.post('/subscribe',(req,res)=>{
    //Get pushSUbscription object
    const subscription=req.body;

    res.status(201).json({});

    const payload=JSON.stringify({title: 'Push Test'});

    webpush.sendNotification(subscription,payload).catch(err=>console.error(err))
})

app.listen(5000,()=>{
    console.log("Listening on 5000")
})