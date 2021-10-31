const User=require('../models/user');
const MESSAGE=require('../config/message');
const UserService=require('../service/user');
const SERVICE=new UserService(User);


exports.createUser=async(req,res)=>{
    try {
        let user=await SERVICE.getUser(req.body.id);
        if(user.length>0) return res.status(405).send({message:MESSAGE.Existing_User});
        user =await SERVICE.getByEmail(req.body.email);
        if(user.length>0) return res.status(405).send({message:MESSAGE.Existing_Email});
        user=await SERVICE.create(req.body);
        return res.status(201).send({user});
    } catch (error) {
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}

exports.getUsers=async(req,res)=>{
    try{
        let users= await SERVICE.getAll();
        if(users.length){
            return res.status(200).send(users);
        }
        res.status(404).send({message:MESSAGE.Users_NoFound});
    }catch(err){
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}

exports.getUser=async(req,res)=>{
    try{
        let id=req.params.id;
        let user=await SERVICE.getById(id);
        if(user)return res.status(200).send({user:user});
        res.status(404).send({message:MESSAGE.User_NoFound}); 
    }catch(err){
        return res.status(500).send({message:MESSAGE.Error_Server,err});
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        let user=await SERVICE.getById(req.params.id);
        if(!user){
            return res.status(404).send({message:MESSAGE.No_User});
        }       
        await User.findOneAndRemove({user:req.params.username}) 
        res.send({message:MESSAGE.Deleted_User});
    }catch(err){
        return res.status(500).send({message:MESSAGE.Error_Server});
    }
}


exports.updateUser=async(req,res)=>{    
    try{
        let id=req.params.id;
        let user=await SERVICE.getById(id);
        if(!user) return res.status(404).send({message:MESSAGE.User_NoFound});
        user
        await SERVICE.update(id,req.body)
        res.status(200).send({ message: MESSAGE.User_Updated });
    }catch(err){
        return res.status(500).send({err:err});
    }

}