import jwt from 'jsonwebtoken';
import { logger } from '../winston/winstonLoggers.js';

export const jwtVerfyUser=(req,res,next)=>{
    try {
    const authToken = JSON.stringify(req.headers.authorization).split(' ')[1];
    logger.info(authToken);
    req.payload = {authToken}

    if (authToken) {
        next();
    } else {
        res.statusMessage ='Authorization Failed'
        res.status(401).json('Authorization Failed')
    }
    
    } catch (error) {
        res.status(403).json(error)
    }
}
