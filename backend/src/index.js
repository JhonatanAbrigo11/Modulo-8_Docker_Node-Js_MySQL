 require('dotenv').config(); 

const express = require('express')
const app = express(); 
const port = process.env.PORT || 3000;
const jwtSecret= process.env.JWT_SECRET;

app.use(express.json());

console.log("clave secreta",jwtSecret)
console.log("port",port)

app.get('/',(req,res)=> {
	res.send('API backend funcionando');
});


app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});
