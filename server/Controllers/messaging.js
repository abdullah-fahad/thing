var Student = require('../Models/students');
var Teachers = require('../Models/teachers');
var Messages = require('../Models/message');
var twilio = require('twilio');
const { response } = require('express');

var sendMessage = (request, response) => {
    var {title, content, recieverPhoneNumber, recieverId, name, senderId} = request.body;
    var accountSid = "ACff5d5a6bd3b28fd88f1a46299b1f109c"
    var authToken = "e9b1187bf7a4f48f0ae79f27a646d5be"
    const client = new twilio(accountSid, authToken);
    var newMessage = new Messages({
        title,
        content,
        createdAt: Date.now(),
        to: recieverId,
        from: name,
        senderId
    })
    newMessage.save()
        .then(result => {
        client.messages.create({
            body: content,
            to: recieverPhoneNumber, 
            from: "+15618232824" 
        })
        .then((message) => response.status(200).send(message))
        .catch(error => response.status(500).send(error))
    })
    .catch(error => {
        response.status(500).send(error);
    })
}

var getMessages = (request, response) => {
    var {senderId, recieverId, students, teachers} = request.body;
    if(recieverId !== null) {
        Messages.find({senderId, to: recieverId}, (err, result) => {
            if(err) return response.status(500).send(err);
            else return response.status(200).json(result);
        })
    }
    else if(students && !teachers) {
        Messages.find({senderId, recieverRole: "students"}, (err, result) => {
            if(err) return response.status(500).send(err);
            else return response.status(200).json(result);
        })
    }
    else if(!students && teachers) {
        Messages.find({senderId, recieverRole: "teachers"}, (err, result) => {
            if(err) return response.status(500).send(err);
            else return response.status(200).json(result);
        })
    }
    else{
        Messages.find({senderId}, (err, result) => {
            if(err) return response.status(500).send(err);
            else return response.status(200).json(result);
        })
    }
}

var removeMessage = (request, response) => {
    var {_id, senderId} = request.body;
    if(_id !== null){
        Messages.remove(_id)
        .then(result => response.status(200).send("تم الحذف بنجاح"))
        .catch(error => response.status(500).send("حدث خطأ أثناء الحذف"));
    } 
    else{
        Messages.remove({})
        .then(result => response.status(200).send("تم حذف جميع الرسائل بنجاح"))
        .catch(error => response.status(500).send("حدث خطأ أثناء الحذف"));
    }
}

module.exports = {sendMessage, getMessages, removeMessage};