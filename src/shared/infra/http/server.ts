import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';

import uploadConfig from '@config/upload';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
    console.log('🚀 Server is running on port 3333');
});
