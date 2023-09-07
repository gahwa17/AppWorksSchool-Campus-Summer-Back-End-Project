const jwt = require('jsonwebtoken');
const secrets = require('../config/secret');
const jwtSecret = secrets.jwtSecret;

const bcrypt = require('bcrypt')
const base64 = require('base-64')

module.exports = {
    bcrypt: bcrypt,
    base64: base64,
    jwt: jwt,
    jwtSecret: jwtSecret,

    extractUserIdFromToken: (req) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.id;
    
        return userId;
    },
    validateEmail: (email) => {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Test the email against the pattern
        return emailPattern.test(email);
    },
    validateProvider: (provider) => {
        return provider === 'native' || provider === 'facebook';
    }
}
