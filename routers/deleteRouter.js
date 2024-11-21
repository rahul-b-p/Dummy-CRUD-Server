import { Router } from "express";
import { readData,writeData } from "../database/index.js";
import { logger } from "../winston/winstonLoggers.js";

export const router = Router();

router.delete('/user/:id', (req, res) => {
    try {

        const { id } = req.params;
        const data = readData();
        const index = id-1;
        if (id <= data.users.length && id >= 0) {
            data.users.splice(index, 1);
            writeData(data);
            res.status(200).send('Item removed')
        }
        else{
            res.status(405).send('Item not Found!')
        }

    } catch (error) {
        logger.error(error);
        res.status(401).send('Something went wrong');
    }
})