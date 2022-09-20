var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messages = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true}
})

module.exports = mongoose.model("Messages", messages);