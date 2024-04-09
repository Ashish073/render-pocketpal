const { refreshAccessToken, oauth2Client } = require("../googleAuth");
const { decrypt } = require("../helper/authHelper");
const { User } = require("../models/userModel");

const oAuthTokenMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.rToken) {
            return res.status(404).json({ message: 'Google Drive Authorization missing! Please authorize Google Drive again' });
        }

        const accessToken = await refreshAccessToken(decrypt(user.rToken));
        if (!accessToken) {
            return res.status(404).json({ message: 'Failed to refresh access token' });
        }

        oauth2Client.setCredentials(accessToken);
        next();
    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = oAuthTokenMiddleware;
