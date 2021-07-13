const dotenv = require('dotenv').config();

module.exports = {

    APP_DOMAIN: process.env.APP_DOMAIN || 'http://localhost:3000',
    SECRET_KEY: process.env.SECRET_KEY || 'sk_test'

}