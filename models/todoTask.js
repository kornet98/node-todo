const { Schema, model } = require('mongoose');



const todoTaskSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
	},
	done: {
		type: Boolean,
		default: false
	}
})
module.exports = model('TodoTask', todoTaskSchema);