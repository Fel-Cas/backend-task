const bcrypt=require('bcryptjs');

module.exports= class User{
    constructor(Servicio){
        this.modelUser=Servicio
    }
    async create(data){
        let password= await this.encriptarContrasena(data.password);
        data.password=password;
        return this.modelUser.create(data);
    }
    getAll(){
        return this.modelUser.find();
    }
    getById(id){
        return this.modelUser.findById(id)
    }
    getByEmail(email){
        return this.modelUser.find({
            email:email
        })
    }
    getUser(id){
        return this.modelUser.find({
            id:id
        });
    }
    update(id,data){
        return this.modelUser.findAndUpdate({_id:id},data);
    }
    delete(id){
        return this.modelUser.delete({
            _id:id
        })
    }

    async encriptarContrasena(password){
        const salt = await bcrypt.genSalt(10);
        return await   bcrypt.hash(password, salt);
    }
    async comparePasswords(password, inputPassword){
        return await  bcrypt.compare(password,inputPassword);
    }
    
}