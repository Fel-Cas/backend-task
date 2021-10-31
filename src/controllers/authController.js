const User=require('../models/user');
const config=require('../config/config');
const jwt=require('jsonwebtoken');
const UserService=require('../service/user');
const SERVICE=new UserService(User);
const MESSAGE=require('../config/message');

exports.login=async (req,res)=>{
    try {
        
        let email=req.body.email;
        let password=req.body.password;
        console.log(email,password)
        let user=await SERVICE.getByEmail(email);
        console.log(user[0].password)

        if(user.length <1) return res.status(403).send({message:MESSAGE.Check_PassUser})
        console.log(await SERVICE.comparePasswords(password,user[0].password));
        if(!await SERVICE.comparePasswords(password,user[0].password)) return res.status(403).send({message:MESSAGE.Check_PassUser});
        let datos={id:user[0]._id};
        const token=jwt.sign(datos,config.SECRET_TOKEN,{
            expiresIn:'1h'
        });
        return res.status(200).send({token:token,rol:user[0].role,id:user[0]._id,cc:user[0].id,message:'Acceso concedido'});
        } catch (error) {
        
    }
}