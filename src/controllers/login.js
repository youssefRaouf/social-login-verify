import * as types from '../consts'

class loginController {

	async login(type) {

		switch (type) {
			case types.FACEBOOK_LOGIN: {
				let data = fetch(`graph.facebook.com/debug_token?input_token=${12}&access_token=${12}`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				})
			}
			case types.GOOGLE_LOGIN: {
				let data = fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${12}`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				})
			}
			default:

		}

	}
}

export default new loginController();
