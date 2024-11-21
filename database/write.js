import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../winston/winstonLoggers.js';

export const writeData=(data)=>{
    try {
        const fileName = fileURLToPath(import.meta.url);
        const dirName = path.dirname(fileName);
        const filePath = path.join(dirName, 'db.json');
    
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        logger.info('Data written successfully to db.json');
      } catch (error) {
        logger.error('Error writing data to file:', error.message);
      }
}
