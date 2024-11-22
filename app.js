import express from 'express';
import dotenv from 'dotenv';
import { logger } from './winston/winstonLoggers.js';
import {createRouter, readRouter, updateRouter, deleteRouter, loginRouter} from './routers/index.js'

dotenv.config();

const app = express();
const port =3000 || process.env.port;

// body parser
app.use(express.json());

//middleware

//routers
app.use('/create',createRouter);
app.use('/read',readRouter);
app.use('/update',updateRouter);
app.use('/delete',deleteRouter);
app.use('/login',loginRouter);

app.listen(port,()=>{
    logger.info(`Server Running at http://localhost:${port}`);
});
