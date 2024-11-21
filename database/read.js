import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../winston/winstonLoggers.js';

export const readData = () => {
    try {

        const fileName = fileURLToPath(import.meta.url);
        const dirName = path.dirname(fileName);
        const jsonData = fs.readFileSync(path.join(dirName, 'db.json'), 'utf-8');
        return JSON.parse(jsonData);

    }catch(error){
        logger.error('db couldn`t readed due to ',error.messege);
    }  
}