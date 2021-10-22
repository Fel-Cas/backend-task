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
}