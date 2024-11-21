import { Router } from "express";
import { readData, writeData } from "../database/index.js";
import { logger } from "../winston/winstonLoggers.js";

export const router = Router();

router.post('/user', (req, res) => {
    try {

        const data = readData();
        data.users.push(req.body);
        writeData(data);
        logger.info(JSON.stringify(data.users));
        res.status(200).json('Content Added');

    } catch (error) {

        logger.error(error);
        res.status(401).send('Something went wrong');
        
    }
})