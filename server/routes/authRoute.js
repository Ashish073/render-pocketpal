const router = require("express").Router();
const bcrypt = require("bcrypt");

const { User } = require('../models/userModel');
const Joi = require("joi");
const authenticateToken = require("../middleware/jwtMiddleware");
const { oauth2Client, authUrl, getToken, refreshAccessToken } = require('../googleAuth');
const { encrypt, decrypt, passDecrypt } = require('../helper/authHelper');

const revokedTokens = new Set();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            passDecrypt(req.body.password), user.password
        );
        console.log(req.body);

        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();

        res.status(200).send({
            token: token,
            userData: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAuthorized: user.isAuthorized
            },
            message: "Logged in successfully"
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post('/logout', authenticateToken, (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        revokedTokens.add(token);
        oauth2Client.setCredentials(null);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/oauth2callback', async (req, res) => {
    const userId = req.query.state;
    const code = req.query.code;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        const encryptedRefreshToken = encrypt(tokens.refresh_token);

        await User.findByIdAndUpdate(userId, { rToken: encryptedRefreshToken, isAuthorized: true });
        oauth2Client.setCredentials(tokens);
        res.redirect('http://localhost:5173')
    } catch (error) {
        console.error('Error exchanging code for tokens:', error.message);
        res.status(500).send('An error occurred during authorization.');
    }
});

router.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAuthorized: user.isAuthorized,
            message: "Fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/auth-url', authenticateToken, (req, res) => {
    const scopes = [process.env.GOOGLE_DRIVE_BASE_URL];
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: req.user._id
    });
    res.json({ authUrl });
});

router.post('/refresh-token', authenticateToken, async (req, res) => {
    const { rToken } = await User.findById(req.user._id);
    try {
        const accessToken = await refreshAccessToken(decrypt(rToken));
        oauth2Client.setCredentials(accessToken);
        res.status(204).end();
    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data)
}

module.exports = router;