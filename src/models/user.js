const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const usuarioShema=mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    names:{
        type:String,
        require:true
    },
    lastnames:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    foto:{
        type:String,
        require:false
    },
    role:{
        type:String,
        default:'USER'
    }
})

usuarioShema.pre('save',function(next){
    bcrypt.genSalt(10).then(salts=>{
        bcrypt.hash(this.password,salts).then(hash=>{
            this.password=hash;
            next();
        }).catch(error=> next(error));
    }).catch(error=> next(error));
});

usuarioShema.statics.encriptarContrasena = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return  await bcrypt.hash(password, salt);
  };
  
usuarioShema.statics.comparePasswords=async (password, inputPassword)=>{
    return await bcrypt.compare(password,inputPassword);
}

const user=mongoose.model('user',usuarioShema);
module.exports=user;