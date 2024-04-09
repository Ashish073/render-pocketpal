const crypto = require("crypto");
const CryptoJS = require("crypto-js");

const secretPassphrase = process.env.TOKEN_PRIVATE_KEY; // Replace 'yourSecretPassphraseHere' with your actual passphrase

const derivedKey = crypto.scryptSync(secretPassphrase, 'salt', 32);

function encrypt(text) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);

    let encryptedData = cipher.update(text, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return iv.toString('hex') + ':' + encryptedData;
}

function decrypt(data) {
    const algorithm = 'aes-256-cbc';

    // Split the IV and encrypted data
    const parts = data.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedData = Buffer.from(parts[1], 'hex');

    // Create a decipher object
    const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv);

    // Decrypt the data
    let decryptedText = decipher.update(encryptedData);
    decryptedText += decipher.final();
    return decryptedText;
}

function getUserFromToken(token) {
    try {
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
            throw new Error('Token is expired');
        }

        const userInfo = {
            user: decodedToken
        };

        return userInfo;
    } catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
}

function verifyToken(token, secretKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Token verification failed
                reject(err);
            } else {
                // Token verification successful, return the decoded payload
                resolve(decoded);
            }
        });
    });
};


function passDecrypt(encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_PASS);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
};


module.exports = {
    encrypt,
    decrypt,
    getUserFromToken,
    passDecrypt
};
