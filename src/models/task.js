const mongoose=require('mongoose');

const taskShema=mongoose.Schema({
    name:{
        type:String,
        require:true    
    },
    description:{
        type:String,
        require:true
    },
    createDate:{
        type:Date,
        default:Date.now()
    },
    deadLine:{
        type:Date,
        require:true
    },
    owner:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'PROGRAMADA'
    }
});

const task=mongoose.model('task',taskShema);
module.exports=task;