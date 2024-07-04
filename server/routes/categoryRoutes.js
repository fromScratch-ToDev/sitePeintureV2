import express from 'express';
import { getCategoryNames, addCategoryName, deleteCategoryName, changeCategoryName, getCategoryDescription, updateCategoryDescription } from '../controllers/categoryController.js';

export const router = express.Router();

router.get('/getCategoryNames', getCategoryNames);
router.post('/addCategoryName', addCategoryName);
router.post('/deleteCategoryName', deleteCategoryName);
router.post('/changeCategoryName', changeCategoryName);
router.get('/getCategoryDescription', getCategoryDescription);
router.put('/updateCategoryDescription', updateCategoryDescription);

export default router;
