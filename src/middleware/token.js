const jwt=require('jsonwebtoken');
const config=require('../config/config');
const User=require('../models/user');

exports.verifyToken= async (req,res,next)=>{
    
    try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const contenido = await jwt.verify(token, config.SECRET_TOKEN);
        const user=await User.findById(contenido.id);
        if(!user) return res.status(404).send({message:'El usuario no existe'});
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

