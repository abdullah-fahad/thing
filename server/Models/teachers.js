var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teachers = new Schema({
    fullName: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    subject: {type: String, required: true},
    messageHistory: [{type: Schema.Types.ObjectId, ref: "Messages"}],
    school: {type: Schema.Types.ObjectId, ref: "Schools"},
    teacherId: {type: String, required: true}
});

module.exports = mongoose.model("Teachers", teachers);