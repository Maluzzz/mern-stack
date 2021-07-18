const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Note: will be interesting add some data validation 
 * library like https://www.npmjs.com/package/joi
 */
const userSchema = new Schema({
    name: { type: 'String', required: true },
    password: { type: 'String', required: true },
    email: { type: 'String', required: true }
});

module.exports = mongoose.model('User', userSchema);