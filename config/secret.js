const crypto = require('crypto');
const defaultSecret = crypto.randomBytes(32).toString('hex');

module.exports = {
  jwtSecret: process.env.JWT_SECRET || defaultSecret
}