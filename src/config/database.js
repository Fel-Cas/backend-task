const mongoose=require('mongoose');
require('dotenv').config({path:'variables.env'});

const conectarDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiledTopology:true,
            useFindAndModify:false
        });
        console.log('Base de datos Conectada');
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports=conectarDB;