const express=require('express');
const cors=require('cors');
const logger = require('morgan');
const conectarDB=require('./config/database');
const routerUser=require('./routers/user');
const routerTask=require('./routers/task')
const routerLogin=require('./routers/auth');

const app=express();
conectarDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/api-user',routerUser);
app.use('/api-task',routerTask );
app.use('/api-auth',routerLogin);

app.listen(3000);
console.log('Serever on port',3000);