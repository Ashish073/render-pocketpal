const { OAuth2Client } = require('google-auth-library');

// Create OAuth2 client instance
const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:5000/api/auth/oauth2callback', // Redirect URI for authorization code flow
});

// Generate auth URL
const scopes = ['https://www.googleapis.com/auth/drive']; // Scopes for accessing Google Drive
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Use 'offline' to get refresh token
    scope: scopes,
});

async function getToken(code) {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        return tokens;
    } catch (error) {
        console.error('Error exchanging authorization code for tokens:', error);
        throw error;
    }
}

async function refreshAccessToken(refreshToken) {
    try {
        const { tokens } = await oauth2Client.refreshToken(refreshToken);
        return tokens;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

module.exports = {
    oauth2Client,
    authUrl,
    getToken,
    refreshAccessToken,
};
