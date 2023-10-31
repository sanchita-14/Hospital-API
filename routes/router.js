const express=require("express");
const passport=require('passport')

const router=express.Router();

const {registerDoctor, registerPatient, createReport, all_reports, allReports,login}=require("../controller/userControllers")

router.post("/doctors/register",registerDoctor);

router.post('/login', login);

router.post('/patients/register',passport.authenticate('jwt',{session:false})  ,registerPatient);

router.post('/patients/:id/create_report',passport.authenticate('jwt',{session:false}),createReport);

router.get('/patients/:id/all_reports',all_reports);

router.get('/reports/:status',allReports);

module.exports=router;

