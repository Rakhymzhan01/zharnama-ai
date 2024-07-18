import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchPageContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw new Error('Failed to fetch page content');
  }
}

async function extractProductInfo(pageContent: string): Promise<string> {
  const prompt = `
    Extract the following information from this product page content:
    1. Product Name
    2. Price
    3. Brief Description
    4. Key Features (up to 5)

    Page content:
    ${pageContent.slice(0, 4000)}  // Limit content to fit within token limits
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that extracts product information from web pages." },
        { role: "user", content: prompt }
      ]
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error extracting product info:', error);
    throw new Error('Failed to extract product information');
  }
}

async function generateAdContent(productInfo: string): Promise<string> {
  const prompt = `
    Create a compelling short video ad script for the following product:

    ${productInfo}

    The ad should be engaging, highlight key features, and include a call to action.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a creative ad copywriter specializing in short video ads." },
        { role: "user", content: prompt }
      ]
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating ad content:', error);
    throw new Error('Failed to generate ad content');
  }
}

export async function generateAd(productUrl: string): Promise<{productInfo: string, adContent: string}> {
  try {
    const pageContent = await fetchPageContent(productUrl);
    const productInfo = await extractProductInfo(pageContent);
    const adContent = await generateAdContent(productInfo);

    return { productInfo, adContent };
  } catch (error) {
    console.error('Error generating ad:', error);
    throw error;
  }
}