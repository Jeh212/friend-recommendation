import 'express-async-errors';
import express from 'express';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import './container';

import { router } from './presentation/routes';
dotenv.config();

const api = express();
api.use(express.json());
api.use(router);


const PORT = 3000;
api.listen(PORT, () => console.log(`Server Up: ${PORT}`));
