require('dotenv').config(); 
const tareasRoutes = require ("./routes/tareaRoutes")
const authRouter= require('./routes/authRouter')
const express = require('express')
const app = express(); 
const port = process.env.PORT || 3000;
const jwtSecret= process.env.JWT_SECRET;

const cors = require('cors')
const corsOptions = {
	origin:'http://localhost:3000' || process.env.CORS_ORIGIN,
	
}
app.use(express.json());

console.log("clave secreta",jwtSecret)
console.log("port",port)

app.get('/',(req,res)=> {
	res.send('API backend funcionando');
});

app.use('/api', tareasRoutes); 
app.use('/api',authRouter)


app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});
