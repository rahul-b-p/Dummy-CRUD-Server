import { Router } from "express";
import { logger } from "../winston/winstonLoggers.js";
import { readData, writeData } from "../database/index.js";

export const router = Router();

router.put('/user', (req, res) => {
    try {

        const { username, password, newUn, newPass, newMail } = req.body;
        const data = readData();
        const index = data.users.findIndex(user => user.username === username && user.password === password);
        logger.info(index)
        if (index !== -1) {

            data.users[index] = { 'username': newUn, 'email': newMail, 'password': newPass };
            logger.info(JSON.stringify(data));
            writeData(data);
            logger.info('Item updated:', data.users[index]);
            res.status(200).send('Item updated');

        } else {

            res.status(405).send('Invalid username or password');

        }

    } catch (error) {

        logger.error(error);
        res.status(401).send('Something went wrong');

    }
})