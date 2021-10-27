const MESSAGE=require('../config/message');
module.exports= class Task{
    constructor(Model){
        this.modelTask=Model;
    }
    createTask(datos){
        return this.modelTask.create(datos);
    }

    getAll(){
        return this.modelTask.find();
    }

    getByOwner(userId){
        return this.modelTask.find({owner:userId});
    }

    getById(id){
        return this.modelTask.findById(id)
    }

    update(id,data){
        return this.modelTask.updateOne({_id:id},data);
    }

    delete(id){
        return this.modelTask.findOneAndDelete({_id:id});
    }

    verifyDate(date){
       let fecha=new Date(Date.now());
       let fechaActual=`${fecha.getFullYear}-${fecha.getMonth()}-${fecha.getDate()}`;
       let fechaTask=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
       fechaTask=new Date(fechaTask); 
       fechaActual=new Date(fechaActual)
       if(!fechaActual>=fechaTask) return true;
       return false;
    }

    validateTask(tasks){
        for(let i=0;i<tasks.length;i++){
            if(!this.verifyDate(tasks[i].deadLine)){
                tasks[i].status=MESSAGE.Expired_Task;
                this.update(tasks[i]._id,tasks[i]);
            }
        }
    }
}