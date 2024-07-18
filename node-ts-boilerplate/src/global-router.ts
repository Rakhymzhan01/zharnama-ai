import { Router } from 'express';
import { router as gptRouter } from './gpt/gpt-router';  // Named import

const router = Router();

router.use('/gpt', gptRouter);

export default router;
