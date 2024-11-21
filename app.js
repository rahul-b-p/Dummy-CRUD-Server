import express from 'express';
import { logger } from './winston/winstonLoggers.js';
import {createRouter, readRouter, updateRouter, deleteRouter} from './routers/index.js'

const app = express();
const port =3000;

// body parser
app.use(express.json());

//middleware

//routers
app.use('/create',createRouter);
app.use('/read',readRouter);
app.use('/update',updateRouter);
app.use('/delete',deleteRouter);

app.listen(port,()=>{
    logger.info(`Server Running at http://localhost:${port}`);
});
