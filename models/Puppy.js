var mongoose = require('mongoose');

var PuppySchema = new mongoose.Schema({
    name: {type: String, default:''},
    location: {type: String, default:''},
    image: {type: String, default:''},
    timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('PuppySchema', PuppySchema);
