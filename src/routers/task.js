const express=require('express');
const router =express.Router();
const task=require('../controllers/taskController');
const token=require('../middleware/token');

router.post('/tasks',task.createTask);
router.get('/tasks',task.getTasks);
module.exports=router;