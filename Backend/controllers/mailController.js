const nodemailer = require('nodemailer');
// const Mailgen = require('mailgen');
require('dotenv').config();

const sendMail = (receiverEmailAddress, content, userName, subject) => {

    const userEmail = receiverEmailAddress;

    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    // let MailGenerator = new Mailgen({
    //     theme: "default",
    //     product : {
    //         name: "CropConnect",
    //         link : 'https://mailgen.js/'
    //     }
    // })

    // let response = {
    //     body: {
    //         name : userName,
    //         intro: content,
    //         // table : {
    //         //     data : [
    //         //         {
    //         //             item : "Nodemailer Stack Book",
    //         //             description: "A Backend application",
    //         //             price : "$10.99",
    //         //         }
    //         //     ]
    //         // },
    //         outro: "Looking forward to do more business"
    //     }
    // }

    // let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : userEmail,
        subject: subject,
        html: content
    }
    transporter.sendMail(message).then(() => {
        console.log("Mail sent");
    }).catch(error => {
        console.log(error);
    })

    // transporter.sendMail(message).then(() => {
    //     return res.status(201).json({
    //         msg: "you should receive an email"
    //     })
    // }).catch(error => {
    //     return res.status(500).json({ error })
    // })
}


module.exports = {
    sendMail
}