import { Router } from "express";
import { logger } from "../winston/winstonLoggers.js";
import { readData } from "../database/index.js";

export const router = Router();

router.get('/user', (req, res) => {
    try {

        const data = readData();
        res.status(200).json(data.users);

    } catch (error) {

        logger.error(error);
        res.status(401).send('Oops! Something went wrong while loading content');

    }
})

router.get('/user/:username', (req, res) => {
    try {

        const data = readData();
        const { username } = req.params;
        const user = data.users.find((item) => item.username == username);
        user ? res.status(200).json(user) : res.status(404).send('no user found');

    } catch (error) {

        logger.error(error);
        res.status(401).send('Something went wrong');

    }
})