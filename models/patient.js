const mongoose=require("mongoose");

const patientSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the patient's name"],
        unique:true
    },
    reports:[{
        status:{
            type:String,
            required:true,
            enum:['Negative','Travelled-Quarantine','Positive-Admit','Symptoms-Quarantine']
        },
        date:{
            type:Date,
            required:true
        }
    }],
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true

    }

})

const Patient=new mongoose.model('Patient',patientSchema);

module.exports=Patient;