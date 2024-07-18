import { Request, Response } from 'express';
import { gptService } from './gpt-service';  // Corrected to named import
import { ProductInfo } from './gpt-types';

let currentProductInfo: ProductInfo | null = null;

export const gptController = {
  async parseProduct(req: Request, res: Response) {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      currentProductInfo = await gptService.parseProductInfo(url);
      res.json(currentProductInfo);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to parse product information' });
    }
  },

  async generateScripts(req: Request, res: Response) {  // Method name should be generateScripts
    try {
      if (!currentProductInfo) {
        return res.status(400).json({ error: 'No product info available. Please parse a product first.' });
      }

      const { targetAudience } = req.body;
      if (!targetAudience) {
        return res.status(400).json({ error: 'Target audience is required' });
      }

      const scripts = await gptService.generateScripts(currentProductInfo, targetAudience);
      res.json(scripts);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to generate scripts' });
    }
  }
};
