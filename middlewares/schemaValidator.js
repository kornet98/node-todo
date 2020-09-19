const Joi = require('joi')


const schemaValidator = async (req, res, next) => {

	const schema = Joi.object({
		title: Joi.string().min(2).max(30).required(),
		description: Joi.string().max(150).optional(),
		done: Joi.boolean()
	});

	try {
		await schema.validateAsync(req.body);
		next();
	}
	catch (error) {
		res.status(422);
		next(error);
	}
}

module.exports = schemaValidator;