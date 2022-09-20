var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var students = new Schema({
    fullName: {type: String, required: true},
    phoneNumber: {type: Number, required: true, unique: true},
    class: {type: String, required: true},
    messageHistory: [{type: Schema.Types.ObjectId, ref: "Messages"}],
    school: {type: Schema.Types.ObjectId, ref: "Schools"},
    teacherId: {type: String, required: true}
})

module.exports = mongoose.model("Students", students);