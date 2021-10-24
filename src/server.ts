import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import uploadConfig from './config/upload';
import routes from './routes';

import './database';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server is running on port 3333');
});
