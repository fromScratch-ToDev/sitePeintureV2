import express from 'express';
import { createImage, deleteImage, changeImageCategory } from '../controllers/imageController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

export const router = express.Router();

router.post('/createImage', upload.single('image'), createImage);
router.delete('/deleteImage', deleteImage);
router.put('/changeImageCategory', changeImageCategory);

export default router;