import express from 'express';
import { backup } from '../controllers/backupController.js';

export const router = express.Router();

router.get('/backup',backup);

export default router;
