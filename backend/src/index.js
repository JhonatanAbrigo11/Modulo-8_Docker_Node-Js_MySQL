require('dotenv').config();
const tareasRoutes = require("./routes/tareaRoutes")
const authRouter = require('./routes/authRouter')
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
const path = require('path');
const cors = require('cors')

const { apiReference } = require('@scalar/express-api-reference');

const corsOptions = {
	origin: 'http://localhost:3000' || process.env.CORS_ORIGIN,
	credentials: true

}
app.use(express.json());

console.log("clave secreta", jwtSecret)
console.log("port", port)

app.get('/', (req, res) => {
	res.send('API backend funcionando');
});

app.use('/api', tareasRoutes);
app.use('/api', authRouter)

app.use('/docs', apiReference({
	theme: 'purple',
	layout: 'modern',
	spec: {
		url: '/api/openapi.yaml',
	},
	configuration: {
		showSidebar: true,
		hideDownloadButton: false,
		hideTryItPanel: false,
		authentication: {
			preferredSecurityScheme: 'bearerAuth',
			apiKey: {
				token: 'token'
			}
		}
	}
}));

app.get('/api/openapi.yaml',(req,res)=>{
	res.setHeader('Content-Type','application/x-yaml')
	res.sendFile(path.join(__dirname, '../docs/openapi.yaml'))
})
app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
	console.log(`Docuemntacion disponible en: http://localhost:${port}/docs`)
});
