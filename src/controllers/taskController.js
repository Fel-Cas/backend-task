const Task=require('../models/task');
const ServiceTask=require('../service/task');
const SERVICE= new ServiceTask(Task);
const MESSAGE=require('../config/message');

exports.createTask= async(req,res)=>{
    try {
        let task=await SERVICE.createTask(req.body);
        return res.status(201).send({message:MESSAGE.Task_created,task:task});
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}

exports.getTasks=async(req,res)=>{
    try {
         let tasks= await SERVICE.getAll();
         return res.status(200).send({tasks:tasks});
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}

exports.updateTask=async(req,res)=>{
    
}

exports.deleteTask=async(req,res)=>{

}