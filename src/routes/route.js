import LoginController from '../controllers/login';

export default class LoginRouter {

    constructor(app) {
        this.app = app;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.app.post('/login', async (req, res) => {
            const user = await LoginController.login(req.body.type)
            res.json(user)
        });
        this.app.get('/register', async (req, res) => {
            // const user = await LoginController.login(req.body.type)
            // res.json(user)
        });
    }
}
