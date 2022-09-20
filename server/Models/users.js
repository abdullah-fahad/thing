var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var users = new Schema({
    fullName: {type: String, required: true},
    phoneNumber: {type: String,  required: true, unique: true},
    password: {type: String, required: true},
    school: {type: Schema.Types.ObjectId, ref: "Schools"},
    students: [{type: Schema.Types.ObjectId, ref: "Students"}],
    teachers: [{type: Schema.Types.ObjectId, ref: "Teachers"}]
})

module.exports = mongoose.model("Users", users);