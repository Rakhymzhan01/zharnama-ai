import axios from 'axios';
import { OPENAI_API_KEY } from '../config';

interface APIError {
    response?: {
        data?: any;
    };
    message: string;
}

export const generatePromotionalScript = async (input: string): Promise<string> => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Generate a promotional script for this product: ${input}` }
                ],
                max_tokens: 150
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        const apiError = error as APIError;
        console.error('Error getting response from OpenAI:', apiError.response?.data || apiError.message || error);
        throw new Error('Failed to generate script');
    }
};
