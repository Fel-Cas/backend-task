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
    date:{
        type:Date,
        default:Date.now()
    },
    owner:{
        type:String,
        require:true
    }
});

const task=mongoose.model('task',taskShema);
module.exports=task;