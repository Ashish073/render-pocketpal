const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validate } = require('../models/userModel');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });

        if (user) return res.status(409).send({ message: "User with given email already exists" });

        const salt = await bcrypt.genSalt(Number(process.env.PASS_SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hashPassword, isAuthorized: false });
        await newUser.save();

        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



module.exports = router;
