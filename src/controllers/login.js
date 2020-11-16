import { response } from 'express';
import * as types from '../consts'
const fetch = require('node-fetch');
class loginController {

	async login(type, token) {

		switch (type) {
			case types.FACEBOOK_LOGIN:
				console.log(token, type)
				let data = await fetch(`https://graph.facebook.com/me?access_token=${token}`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}).then(response => response.json())
				console.log(data);
              return{}
			case types.GOOGLE_LOGIN:
				console.log("hna")
				let data1 = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}).then(response => response.json());
				console.log(data1);
				return{}
			default:
				console.log("lol")
		}

	}
}

export default new loginController();
