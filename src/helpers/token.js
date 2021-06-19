const jwt = require('jsonwebtoken');

module.exports = {
    createAccessToken: async(payload) => {
        return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:'7d'})
    }
}