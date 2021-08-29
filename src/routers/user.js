const express=require('express');
const router=express.Router();
const user=require('../controllers/userController');
const token=require('../middleware/token');

router.get('/:username',token.verifyToken(),user.getUser);
router.get('/',token.verifyToken(),user.getUsers)
router.post('/',user.createUser);
router.put('/');
router.put('/:id',token.verifyToken(),user.updatePassword);
router.delete('/:username', token.verifyToken(),user.deleteUser);

module.exports=router;