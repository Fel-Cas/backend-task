const Task=require('../models/task');
const ServiceTask=require('../service/task');
const SERVICE= new ServiceTask(Task);
const MESSAGE=require('../config/message')
exports.createTask= async(req,res)=>{
    try {
        let task=await SERVICE.createTask(req.body);
        return res.status(201).send({task});
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}

exports.getTasks=async(req,res)=>{
    try {
         let tasks= await SERVICE.getAll();
         if(tasks.length<1) return res.status(404).send({message:MESSAGE.Tasks_NoFound})
         return res.status(200).send({tasks:tasks});
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}

exports.getTasksByOwner=async(req,res)=>{
    try {
        //Verificar usuarios
        let idOwner=req.params.id;
        let tasks=await SERVICE.getByOwner(idOwner);
        if(tasks.length<1) return res.status(404).send({message:MESSAGE.Tasks_NoFound});
        SERVICE.validateTask(tasks);
        return res.status(200).send({tasks});
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }

}

exports.updateTask=async(req,res)=>{
    try {
        let id=req.params.id;
        let task=await SERVICE.getById(id);
        if(!task) return res.status(404).send({message:MESSAGE.Task_NoFound});
        await SERVICE.update(id,req.body);
        return res.status(201).send({message:MESSAGE.Task_Updated})
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

exports.delete=async(req,res)=>{
    try{
        let id=req.params.id;
        let task=await SERVICE.getById(id);
        if(!task) return res.status(404).send({message:MESSAGE.Task_NoFound});
        await SERVICE.delete(id);
       return res.status(201).send({message:MESSAGE.Deleted_Task}) 
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}