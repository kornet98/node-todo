const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const todoRoutes = require('./routes/todos')

const app = express()


app.use(express.json())
app.use(todoRoutes)


const PORT = config.get('port') || 3000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'),
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			}
		)
		app.listen(PORT, () => {
			console.log(`App has been started on port ${PORT}...`);
		});
	} catch (e) {
		console.log("Server Error", e.massage);
		process.exit(1);
	}
}

start();