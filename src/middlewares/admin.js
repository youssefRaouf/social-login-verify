export const admin = (req, res, next)=>{
    if(req.user.isAdmin){
        next();
    }else{
        res.sendStatus(403);
    }
}