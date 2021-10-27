const express=require('express');
const router =express.Router();
const task=require('../controllers/taskController');
const token=require('../middleware/token');

router.post('/tasks',task.createTask);
router.get('/tasks',task.getTasks);
router.get('/tasks/:id',task.getTasksByOwner);
router.put('/tasks/:id', task.updateTask);
router.delete('/tasks/:id',task.delete)
module.exports=router;