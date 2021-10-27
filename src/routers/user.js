const express=require('express');
const router=express.Router();
const user=require('../controllers/userController');
const token=require('../middleware/token');

router.post('/users', user.createUser)

module.exports=router;