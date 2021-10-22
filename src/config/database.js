const mongoose=require('mongoose');
const config=require('./config');

const conectarDB=async()=>{
    try{
        await mongoose.connect(config.DB_MONGO,{
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