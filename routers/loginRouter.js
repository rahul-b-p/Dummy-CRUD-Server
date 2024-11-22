import { Router } from "express";
import { readData } from "../database/index.js";
import { getUserAuthToken } from "../jwt/index.js";
import { logger } from "../winston/winstonLoggers.js";

export const router = Router();

router.post('/', (req, res) => {
    try {

        const { email, password } = req.body
        const data = readData();
        const user = data.users.find(item=>item.email==email);
        if (user) {
            if (user.password == password) {
                const userAuthToken = getUserAuthToken(user.username);
                logger.info(userAuthToken)
                res.statusMessage = 'login successful'
                res.status(200).json({userAuthToken})
            }else{
                res.statusMessage= 'Incorrect password'
                res.status(400).json('Requested password not matched with the user password, please check');
            }
        }
        else{
            res.statusMessage = 'User not found'
            res.status(400).json('Requested user not found from the server, please check');
        }

    } catch (error) {
        res.status(403).send(error.messege)
        logger.error(error.messege)
    }
})

