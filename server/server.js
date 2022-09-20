var express = require ('express');
var  mongoose = require('mongoose');
var cors = require('cors');
const { signUp, logIn, getUsers, removeUser, decodeToken } = require('./Controllers/users');
const { deleteUser } = require('firebase/auth');
const { createStudent, removeStudent, modifyStudent, getStudents } = require('./Controllers/students');
var db = mongoose.connect('mongodb://localhost/SGP');


var app = express();

app.use(cors({
    origin: 'http://localhost:3000'
  }))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.send("Hello there!");
})

//users
app.post('/deleteuser', removeUser);
app.get('/getusers', getUsers);
app.post('/signup', signUp);
app.post('/login', logIn);

//students
app.post('/new-student', createStudent);
app.post('/remove-student', removeStudent);
app.post('/modify-student', modifyStudent);
app.get('/students', getStudents);

app.listen(8000, () => {
    console.log("Server is running successfully on port 8000");
})