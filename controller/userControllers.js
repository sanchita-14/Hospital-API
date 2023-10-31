const { model } = require("mongoose");
const Doctor=require("../models/doctor.js");
const Patient=require("../models/patient");
const jwt=require("jsonwebtoken")

module.exports.registerDoctor=async(req,res,next)=>{
    try{
        const doctor=await Doctor.create(req.body);
        res.status(200).json({
            success:true,
            message:"Doctor's profile created successfully!"
        })

    } catch(error){
        res.status(500).json({
            success:false,
            message:'Doctor profile could not be created due to internal server error'
        })
    }
}

module.exports.registerPatient=async(req,res,next)=>{
    try{
        req.body.doctor="65412a18afa5a11f821dad39"
        const patient=await Patient.create(req.body);
        res.status(200).json({
            success:true,
            message:"Patient's profile created successfully!"
        })

    } catch(error){
        res.status(500).json({
            success:false,
            message:'Patient profile could not be created due to internal server error'
        })
    }
}

module.exports.createReport=async(req,res,next)=>{
    try{
        const patient=await Patient.findById(req.params.id);
        req.body.date=Date.now();
        patient.reports.push(req.body);

        patient.save();

        res.status(200).json({
            success:true,
            message:"Report submitted sucessfully"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Report not generated,internal server error"
        })

    }
}

module.exports.all_reports=async(req,res,next)=>{
    try{
        const patient=await Patient.findById(req.params.id);
        


        res.status(200).send(`Patient reports: ${patient.reports}`)


    }catch(error){
        res.status(500).json({
            success:false,
            message:"Could not fetch patient reports due to internal server error."
        })
    }
}

module.exports.allReports=async(req,res,next)=>{
    try{
        const patient=await Patient.find({reports:{$elemMatch:{status:req.params.status}}});

            res.status(200).json({
                success:true,
                data:patient
            })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Could not fetch patient reports due to internal server error."
        })

    }
}

module.exports.login=async(req,res,next)=>{
    try{
        const user=Doctor.find(req.body);
        if(user){
            const token=jwt.sign(user.id,"secret")
            res.status(200).send(token)
        }else{
            res.status(404).send("User not found")
        }

    }catch{
        res.status(500).json({
            success:false,
            message:"Something went wromg due to internal server error"
        })

    }
}