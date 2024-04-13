import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

let nodeConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name : "Mailgen",
        link: "https://mailgen.js/"
    }
})

export const registerMail = async (req, res) => {
    const {username, userEmail, text, subject} = req.body;

    //body of email
    var email = {
        body: {
            name: username,
            intro: text || "Welcome!",
            outro: 'Need help, or have questions? reply!'
        }
    }

    var emailBody = MailGenerator.generate(email)

    let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup successful",
        html : emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({msg: "You should receive an email from us"})
        })
        .catch(error => res.status(500).send({error}))

}