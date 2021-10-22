const express=require('express');
const router=express.Router();
const user=require('../controllers/userController');
const token=require('../middleware/token');


module.exports=router;