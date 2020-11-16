import jwt from 'jsonwebtoken';

export const token = (req, res, next)=>{
    try {
        const user = jwt.verify(req.header('token'), process.env.SECRET);
        req.user = user
        next();
    }catch(e){
        res.sendStatus(401);
    }
}