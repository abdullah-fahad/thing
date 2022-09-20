var Students = require('../Models/students');
var Users = require('../Models/users');
const isArabic = require('is-arabic');
var mongoose = require("mongoose");



var createStudent = async(request, response) => {
    var {fullName, phoneNumber, tPhoneNumber, classs} = request.body;
    if(!isArabic(fullName, {count: 1})) return response.status(400).send("يجب أن يتكون اسم الطالب من احرف عربية");
    if(phoneNumber.length !== 9) return response.status(400).send("الرجاء إدخال رقم هاتف صحيح(يتكون من 9 أحرف)");
    if(!isArabic(classs, {count: 1})) return response.status(400).send("يجب ان يتم كتابة فصل الطالب بأحرف عربية");

    Students.findOne({phoneNumber})
    .then((found) => {
        if(found !== null) return response.status(400).send("لديك بالفعل طالب يملك رقم الهاتف هذا ");
        else {
            Users.findOne({phoneNumber: tPhoneNumber})
            .then((result) => {
                console.log(result)
                var newStudent = new Students({
                    fullName,
                    phoneNumber,
                    class: classs,
                    school: result.school,
                    teacherId: result._id
                })

                newStudent.save()
                .then((result) => {
                    console.log(0)
                    Users.findOneAndUpdate({phoneNumber: tPhoneNumber}, {$push : {students: result._id}})
                    .then(result => {
                        response.status(200).send("تم حفظ الطالب بنجاح !");
                    })
                    .catch(error => {
                        response.status(500).send("حدث خطأ أثناء حفظ الطالب");
                    })
                })
                .catch(error => {
                    response.status(500).send("حدث خطأ اثناء تسجيل الطالب");
                });
            })
            .catch(error => {
                response.status(500).send("حدث خطأ أثناء ارسال بيانات الطالب")
            })

        }
    })
    .catch(error => {
        response.status(500).send("حدث خطأ ما");
    })
}

var removeStudent = async(request, response) => {
    var {_id} = request.body;
    Students.remove({_id})
    .then(result => {
        response.status(200).send(result);
    })
    .catch(error => {
        response.status(500).send(error)
    })
}

var modifyStudent = async(request, response) => {
    var {_id, newFullName, newPhoneNumber, newClass} = request.body;
    Students.findOne({phoneNumber: newPhoneNumber || "666"})
    .then(found => {
        if (found !== null) return response.status(400).send("لديك بالفعل طالب يملك رقم الهاتف هذا");
        else {
            Students.findByIdAndUpdate({_id}, {
                fullName: newFullName,
                phoneNumber: newPhoneNumber,
                class: newClass
            })
            .then(result => {
                response.status(200).send("تم تعديل بيانات الطالب");
            })
            .catch(error => {
                response.status(500).send("حدث خطأ أثناء تعديل بيانات الطالب");
            })
        }
    })
    .catch(error => {
        response.status(500).send("حدث خطأ ما");
    })
}

var getStudents = (request, response) => {
    var {_id} = request.body;
    Students.find({teacherId: _id})
    .then(result => {
        if(result === null) response.status(200).send("لم تقم بإضافة أي طالب");
        else response.status(200).send(result);
    })
    .catch(error => {
        response.status(500).send("حدث خطأ اثناء تحميل الطلاب");
    })
}

module.exports = { createStudent, removeStudent, modifyStudent, getStudents }