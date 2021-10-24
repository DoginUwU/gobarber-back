import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

import './database';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server is running on port 3333');
});
