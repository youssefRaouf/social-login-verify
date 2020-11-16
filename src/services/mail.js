const api_key = 'aef1df0296583f1766f579c72eed2841-53c13666-6c25a29e';
const domain = 'sandboxa0c175721da442138aa090b001d031c4.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });


class MailGunner {

    sendMail(body, title, email) {
        const data = {
            from: 'danielraoufwadea@gmail.com',
            to: email,
            subject: title,
            text: body
        };
        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
}

export default new MailGunner();

