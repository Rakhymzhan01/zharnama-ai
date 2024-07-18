import express from 'express';
import gptRouter from './gpt/gpt-router';
import { config } from './config';
import { logger } from './logger';

const app = express();
const PORT = config.PORT || 5000;

app.use(express.json());
app.use('/api/gpt', gptRouter);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
