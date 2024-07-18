import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '', // Use empty string as fallback
};

if (!config.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}
