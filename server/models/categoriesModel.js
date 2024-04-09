const mongoose = require('mongoose');
const Joi = require('joi');

const categoriesSchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const Categories = mongoose.model('categories', categoriesSchema);

const validate = (data) => {
    const schema = Joi.object({
        categoryName: Joi.string().required(),
    })
    return schema.validate(data);
};

module.exports = { Categories, validate };

