import axios from 'axios';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

dotenv.config();

const DID_API_KEY = process.env.DID_API_KEY || 'your_did_api_key';
const encodedApiKey = Buffer.from(DID_API_KEY).toString('base64');

async function generateVideoDID(inputText: string) {
  const payload = {
    source_url: "https://github.com/de-id/live-streaming-demo/blob/main/emma_idle.png?raw=true",  // Updated image URL
    script: {
      type: "text",
      input: inputText,
      provider: {
        type: "microsoft",
        voice_id: "en-US-JennyNeural"
      }
    },
    config: {
      fluent: "false",
      pad_audio: "0.0",
      result_format: "mp4"
    }
  };
  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'authorization': `Basic ${encodedApiKey}`
  };

  const maxRetries = 3;
  const retryDelay = 5000;  // 5 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Sending request to D-ID API (Attempt ${attempt})...`);
      const response = await axios.post('https://api.d-id.com/talks', payload, { headers });
      if (response.status === 201) {
        console.log('Video generated successfully:', response.data);
        return response.data.id;
      } else {
        console.error('Unexpected response status:', response.status);
        return null;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Error Response Data:', error.response?.data);
        console.error('Error Status:', error.response?.status);
        if (error.response?.status === 504) {
          // Retry on timeout error
          if (attempt < maxRetries) {
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          } else {
            console.error('Max retries reached. Request failed.');
            return null;
          }
        } else {
          return null;
        }
      } else {
        console.error('Non-Axios Error:', (error as Error).message);
        return null;
      }
    }
  }
}

async function checkVideoStatus(talkId: string) {
  const headers = {
    'accept': 'application/json',
    'authorization': `Basic ${encodedApiKey}`
  };

  try {
    const response = await axios.get(`https://api.d-id.com/talks/${talkId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error checking video status:', error);
    return null;
  }
}

export { generateVideoDID, checkVideoStatus };
