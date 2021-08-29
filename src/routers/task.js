const express=require('express');
const router =express.Router();
const task=require('../controllers/taskController');
const token=require('../middleware/token');

router.get('/:userId',token.verifyToken(),task.getTasks);
router.post('/',token.verifyToken(),task.createTask);
router.put('/:taskId',token.verifyToken(),task.updateTask);
router.delete('/:taskId',token.verifyToken(),task.deleteTask);

module.exports=router;