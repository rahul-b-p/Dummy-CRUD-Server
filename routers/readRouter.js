import { Router } from "express";
import { logger } from "../winston/winstonLoggers.js";
import { readData } from "../database/index.js";
import { jwtVerfyUser } from "../middleware/jwtAuthMiddleware.js";

export const router = Router();

// read all
router.get('/user', (req, res) => {
    try {

        const data = readData();
        res.status(200).json(data.users);

    } catch (error) {

        logger.error(error);
        res.status(401).send('Oops! Something went wrong while loading content');

    }
})

// read by id parameter
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

// read by query parameters
router.get('/search-user', (req, res) => {
    try {

        const key = req.query.key;
        const data = readData();
        const result = data.users.filter(user => {
            // Convert object to localized string and check if it contains the query
            const locale = "en-US";
            const localizedString = user.username.toLocaleString(locale) + " " + user.email.toLocaleString(locale);
            return localizedString.toLowerCase().includes(key.toLowerCase());
        });
        if (result.length>0) {
            res.status(200).json(result);
        } else {
            res.status(404).json('Search Item not Found')
        }

    } catch (error) {

        logger.error(error);
        res.status(401).send('Oops! Something went wrong while loading content');

    }
})

// read by authentication
router.get('/auth-user', jwtVerfyUser, (req, res) => {
    try {

        const { authToken } = req.payload
        logger.info(authToken)
        if(authToken){
            const data = readData();
            res.statusMessage ='Authentication Success'
            res.status(200).json(data)
        }

    } catch (error) {
        res.status(404).json('Something went wrong')
    }
})