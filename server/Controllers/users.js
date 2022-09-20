var Users = require('../Models/users');
var Schools = require('../Models/schools');
var bcrypt = require('bcrypt');
var isArabic = require("is-arabic");
require('dotenv').config;

var signUp = async(request, response) => {
    var {fullName, phoneNumber, password, school} = request.body;
    if(!isArabic(school.name, {count: 1})){
        response.status(400).send("يجب أن يتكون اسم المدرسة من احرف عربية");
        return null;
    }
    if(!isArabic(school.address, {count: 1})){
        response.status(400).send("يجب ان يتكون عنوان المدرسة من احرف عربية");
        return null;
    }
    if(!isArabic(school.level, {count: 1})){
        response.status(400).send("يجب أن يتكون من أحرف عربية");
        return null;
    }

    var newSchool = new Schools({
        name: school.name,
        address: school.address,
        level: school.level
    });
    
    newSchool.save()
    .then(schoolResult => {
        if(!isArabic(fullName, {count: 1})){
            response.status(404).send("يجب ان يتكون الاسم من احرف عربية فقط");
            return null;
        }
        // if(phoneNumber.length !== 12){
        //     response.status(400).send("الرجاء إدخال رقم هاتف صحيح (يتكون من 9 أرقام)");
        //     return null;
        // }
        if(password.length <= 5){
            response.status(404).send("يجب ان تتكون كلمة المرور من 6 أحرف على الأقل");
            return null;
        }
    
        Users.findOne({phoneNumber}, (err, result) => {
            console.log(result);
            if(result === null){
                bcrypt.hash(password, 10)
                .then(hashedPass => {
                    var newUser = new Users({
                        fullName,
                        phoneNumber,
                        password: hashedPass,
                        school: schoolResult._id,
                        students: [null]
                    })
    
                    newUser.save()
                    .then(result => {
                        response.status(200).send(result);
                    })
                    .catch(error => {
                        response.status(500).send(error);
                    })
                })
                .catch(error => {
                    response.status(500).send("حدث خطأ أثناء تشفير كلمة المرور");
                })
            }
            else{
                response.status(404).send("رقم الهاتف موجود مسبقًا");
            }
            if(err){
                response.status(500).send("حدث خطأ ما");
            }
        })
    })
    .catch(error => {
        response.status(500).send(error);
    })

}

var logIn = async(request, response) => {
    var data = request.body;
    var user = await Users.findOne({ phoneNumber: data.phoneNumber }).lean();
    if(!user || user === null || user.password === null) return response.status(401).send("كلمة مرور او رقم هاتف خاطئ");

    if(await bcrypt.compare(data.password, user.password)){
        response.status(200).json({token});
    }
    else response.status(401).send("كلمة مرور او رقم هاتف  خاطئ")
}


var getUsers = (request, response) => {
    
    
    Users.find({}, (err, result) => {
        if (err) response.status(500).send(err);
        else response.status(200).send(result);
    })
    
}

var removeUser = (request, response) => {
    Users.deleteOne({_id: request.body._id}, (err, result) => {
        if (err) response.status(500).send(err);
        else response.status(200).send(result);
    })
}

module.exports = {signUp, logIn, getUsers, removeUser};