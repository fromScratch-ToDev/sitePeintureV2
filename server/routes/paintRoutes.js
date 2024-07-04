import express from 'express';
import { getPaintData, getPaintIds, getPaintDescription, postPaintDescription, modifyPaintOrder } from "../controllers/paintController.js";

export const router = express.Router();

router.get('/getPaintingsIds',getPaintIds);
router.get('/getPaintData',getPaintData); 
router.get('/getPaintDescription',getPaintDescription);
router.post('/postPaintDescription',postPaintDescription);
router.put('/modifyPaintOrder',modifyPaintOrder)

export default router