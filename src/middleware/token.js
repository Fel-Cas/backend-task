const jwt=require('jsonwebtoken');
const config=require('../config/config');
const User=require('../models/user');

exports.verifyToken= async (req,res,next)=>{
    const token=req.headers['token'];
    if(!token) return res.status(401).send({message:'No hay token de validación'});
    
    const contenido=jwt.verify(token,config.SECRET_TOKEN);

    const user=await User.findById(contenido.id);
    if(!user) return res.status(404).send({message:'El usuario no existe'});

    let newToken=jwt.sign({id:user._id,username:user.user},config.SECRET_TOKEN,{expiresIn:'1h'})
    res.status(200).send({message:'Ok',token,id:user._id,username:user.user});
    next();
}

