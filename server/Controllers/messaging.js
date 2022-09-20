var Student = require('../Models/students');
var Teachers = require('../Models/teachers');
var Messages = require('../Models/message');
var twilio = require('twilio');

var sendMsssage = (request, response) => {
    var {title, content, recieverPhoneNumber, recieverId, name} = request.body;
    var accountSid = "ACff5d5a6bd3b28fd88f1a46299b1f109c"
    var authToken = "dc4cd6dea848fb263514cbcbc6fae62c"
    const client = new twilio(accountSid, authToken);
    var newMessage = new Messages({
        title,
        content,
        createdAt: Date.now(),
        to: recieverId,
        from: name
    })
    newMessage.save()
        .then(result => {
        client.messages.create({
            body: message,
            to: recieverPhoneNumber, 
            from: "+1 561 823 2824" 
        })
        .then((message) => console.log(message.sid))
        .catch(error => response.status(500).send("حدث خطأ ما"))
    })
}