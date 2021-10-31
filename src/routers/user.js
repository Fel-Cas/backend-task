const express=require('express');
const router=express.Router();
const user=require('../controllers/userController');
const token=require('../middleware/token');

router.post('/users', user.createUser);
router.get('/users',user.getUsers);
router.get('/users/:id',user.getUser);
router.put('/users/:id',user.updateUser);
router.delete('/users/:id',user.deleteUser);


module.exports=router;