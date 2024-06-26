import jwt from 'jsonwebtoken'
export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token = authHeader.split(' ')[1];
    try{
        const verify = jwt.verify(token,JWT_SECRET);
        if(verify.email === req.email)
        {
            next();
        }
        else{
            return res.status(403).json({});
        }
    }
    catch(err){

    }
    next();
}