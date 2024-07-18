import express from 'express';
import { gptController } from './gpt-controller';

const router = express.Router();

router.post('/parse-product', gptController.parseProduct);
router.post('/generate-scripts', gptController.generateScripts); // Ensure method name is correct

export default router;
