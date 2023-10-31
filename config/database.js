const mongoose = require('mongoose');


let mongoUrl="mongodb://127.0.0.1:27017/hospital"


main().then(()=>{
    console.log ("Connected")
}).catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect(mongoUrl)
}

const db=mongoose.connection;

module.exports=db;