const router = require("express").Router();
const authenticateToken = require("../middleware/jwtMiddleware");
const { Categories, validate } = require('../models/categoriesModel');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const categories = await Categories.find();
        if (!categories) {
            return res.status(404).json({ message: 'No Categories Found' });
        }
        res.status(200).json({
            categories: categories,
            message: "Fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
