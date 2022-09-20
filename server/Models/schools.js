var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schools = new Schema({
    name: {type: String, required: true},
    address: {type: String, reuired: true},
    level: {type: String, required: true},
})

module.exports = mongoose.model("Schools", schools);