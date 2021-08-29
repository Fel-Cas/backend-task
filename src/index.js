const express=require('express');
const conectarDB=require('./config/database');
const cors=require('cors');
const routerUser=require('./routers/user');
const routerTask=require('./routers/task')
const routerLogin=require('./routers/auth');

const app =express();
conectarDB();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/api-user',routerUser);
app.use('/api-task',routerTask );
app.use('/api-auth',routerLogin);

app.listen(5000);
console.log('Serever on port',3000)