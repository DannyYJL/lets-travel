let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestsSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
});


let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestsSchema, 'callback-requests');

module.exports = { CallbackRequest };