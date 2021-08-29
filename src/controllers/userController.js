const User=require('../models/user');

exports.createUser=(req,res)=>{
    let user=new User(req.body)
    user.save().then(savedUser=>{
        return res.status(201).send({savedUser, message:'Usuario guardado correctamente'})
    }).catch(err=>res.status(500).send({message:'Ha ocurrido un error', erro:err}));
}

exports.getUsers=async(req,res)=>{
    try{
        let users= await User.find({});
        if(users.length){
            return res.status(200).send(users);
        }
        res.status(404).send({message:'No hay usuarios registrados'});
    }catch(err){
        res.status(500).send({message:'Hubo un error', error:err})
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        let user=await User.find({user:req.params.username});
        if(user.length==0){
            return res.status(404).send({message:'El usuario no existe'})  
        }       
        await User.findOneAndRemove({user:req.params.username}) 
        res.send({message:'Usuario eliminado'});
    }catch(err){
        res.status(500).send({message:'Ha ocurrido un error',error:err})
    }
}

exports.getUser=async(req,res)=>{
    try{
        let username=req.params.username;
        let getUser=await User.findOne({user:username});
        if(getUser)return res.status(200).send({user:getUser});
        res.status(404).send({message:'Usuario no encontrado'}); 
    }catch(err){
        res.status(500).send({message:'Ha ocurrido un error',error:err});
    }
}

exports.updatePassword=async(req,res)=>{    
    try{
        let id=req.params.id;
        let password=req.body.password;
        let user= await User.findById(id);
        if(!user) return res.status(404).send({message:'Usuario no encontrado'});
        user.password= await User.encriptarContrasena(password);
        await User.updateOne({user:user.user},user,(err, user) => {
            if (err) res.status(500).send({ message: `Error ${err}` })
            res.status(200).send({ message: "Actualizacion correcta" })
        });
    }catch(err){
        res.status(500).send({message:'Ha ocurrido un error',error:err});
    }

}