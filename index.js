const express=require("express");
const router=require("./routes/router.js");
const bodyParser=require("body-parser");
const db=require("./config/database.js")
const passport=require('passport');
const passportStrategy=require('./config/passport.js')
const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const port=8080;


app.use(router);

app.listen(port,(err)=>{
if(err){
    console.log(`Server is giving an error:${err}`)
}else{
    console.log("Connection successful")
}
});

