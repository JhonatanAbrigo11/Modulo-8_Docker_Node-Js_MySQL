const express = require('express')
const app = express();

app.use(express.json());


app.get('/',(req,res)=> {
	res.send('API backend funcionando');
});

const PORT = process.env.POR || 3000;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
