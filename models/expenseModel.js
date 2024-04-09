const mongoose = require('mongoose');
const Joi = require('joi');

const expenseSchema = new mongoose.Schema({
    userId: { type: String, ref: 'users', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model('expenses', expenseSchema);

const validate = (data) => {
    const schema = Joi.object({
        category: Joi.string().required(),
        amount: Joi.number().positive().required(),
        description: Joi.string().allow('').optional(),
    })
    return schema.validate(data);
};

module.exports = { Expense, validate };
