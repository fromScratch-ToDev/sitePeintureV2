import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import { router as categoryRoutes } from './routes/categoryRoutes.js';
import { router as imageRoutes } from './routes/imageRoutes.js';
import { router as paintRoutes } from './routes/paintRoutes.js';
import { router as backupRoutes } from './routes/backupRoutes.js';

const app = express();

app.use(cors());
app.use("/images", express.static("server/images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/categories', categoryRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/paintings', paintRoutes);
app.use('/api/backup', backupRoutes);

export default app;