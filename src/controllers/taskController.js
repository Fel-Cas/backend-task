const Task=require('../models/task');

exports.createTask=(req,res)=>{
    let task=new Task(req.body);
    task.save().then(savedTask=>{
        return res.status(201).send({savedTask, message:'Tarea Creada correctamente'})
    }).catch(err=>res.status(500).send({message:'Ha ocurrido un error', erro:err}));

}

exports.getTasks=async(req,res)=>{
    try{
        let userId=req.params.userId;
        let task= await Task.find({owner:userId});
        if(task.length) return res.status(200).send({task});
        res.status(404).send({message:'Este usuario no tiene tareas registradas'});
    }catch(err){
        res.status(500).send({message:'Hubo un error', error:err})
    }
}

exports.updateTask=async(req,res)=>{
    try{
        let id=req.params.taskId;
        let task= await Task.findById(id); 
        if(!task) return res.status(404).send({message:"La tarea no existe."}) 
        let {name,description,date}=req.body;
        if(name == undefined || name == "" || name == null){
            name=task.name;
        }
        if(description == undefined || description == "" || description == null){
            description=task.description;
        }
        if(date == undefined || date == "" || date == null){
            date=task.date;
        }
        task.name=name,
        task.description=description;
        task.date=date;
        
        await Task.findByIdAndUpdate(id,task);
        res.status(201).send({message:'Tarea Actualizada'})

    }catch(err){
        res.status(500).send({message:'Hubo un error', error:err});
    }
}

exports.deleteTask=async(req,res)=>{
    try{
        let id=req.params.taskId;
        let task= await Task.find({_id:id}); 
        if(task.length==0) return res.status(404).send({message:'La tarea no exite'});
        await Task.findByIdAndDelete(id)
        res.send({message:'Tarea eliminada.'});
    }catch(err){
        res.status(500).send({message:'Hubo un error', error:err})
    }
}