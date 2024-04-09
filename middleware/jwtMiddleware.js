const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const authenticateToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    } else {
        token = Cookies.get('token');
    }


    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;
