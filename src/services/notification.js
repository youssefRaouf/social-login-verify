
import jwt from 'jsonwebtoken';
class NotificationSender {

    sendNotification(body, title, token, payload) {
        let user = jwt.verify(token, process.env.SECRET);
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAd6Yf1QQ:APA91bEsuPV82uni9CfvHmUuvG_dBfjajnAoVOMdsm2ewpJ8uiiYn00cR1YmltTbktQbIg6b8Ae69Pyw_uVrFQX154y9i_Sr-7ObrUchVdAjMdMmaGJhAYnZuPHnBhLxIvrtHjn8LCEi'
            },
            body: JSON.stringify({
                to: user.device_token,
                notification: {
                    title: title,
                    body: body
                }
            }),
        })
    }

    sendNotificationtoAll(body, title, payload) {
       let data= fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAd6Yf1QQ:APA91bEsuPV82uni9CfvHmUuvG_dBfjajnAoVOMdsm2ewpJ8uiiYn00cR1YmltTbktQbIg6b8Ae69Pyw_uVrFQX154y9i_Sr-7ObrUchVdAjMdMmaGJhAYnZuPHnBhLxIvrtHjn8LCEi'
            },
            body: JSON.stringify({
                topic: "all",
                notification: {
                    title: title,
                    body: body
                }
            }),
        })
        console.log(data)
    }

}

export default new NotificationSender();

