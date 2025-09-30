require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  
const auhtRouter = require('./Routes/authRouter')
const path = require('path')
const { apiReference } = require('@scalar/express-api-reference');

app.use(express.json())

app.listen(port,()=> {
    console.log(`Servidor escuchando en el puerto ${port}`)
    console.log(`Docuemntacion disponible en: http://localhost:${port}/docs`)

})
app.use('/api', auhtRouter)
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
app.get('/', (req, res) => {
	res.send('API backend funcionando');

});