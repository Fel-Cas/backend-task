const User=require('../models/user');
const config=require('../config/config');
const jwt=require('jsonwebtoken');

exports.login=async (req,res)=>{
    let username=req.body.username;
    let password=req.body.password;

    let user=await User.findOne({user:username})||await User.findOne({email:username});
    if(!user) return res.status(401).send({message:'Usuario o contraseña inválidos'});
    if(!await User.comparePasswords(password,user.password)) return res.status(403).send({message:'Usuario o contraseña inválidos'});

    let datos={
        id:user._id,
        username:user.user
    }
    const token=jwt.sign(datos,config.SECRET_TOKEN,{
        expiresIn:'1h'
    });
    res.status(200).send({token:token,id:datos.id,names:user.names,lastnames:user.lastnames,email:user.email,username:user.user,message:'Acceso concedido'});
}