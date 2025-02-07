import { CohereClient } from 'cohere-ai';

// Get the Cohere API key from environment variables
const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

// Initialize Cohere client with the API key
const client = new CohereClient({ token: COHERE_API_KEY });

// Function to send message content to Cohere API
export const sendMessageToAPI = async (content: string): Promise<any> => {
  try {
    // Use the Cohere client to send the message and get a response
    const response = await client.generate({
      model: 'command', // Adjust the model as needed
      prompt: content,
      maxTokens: 100, // Adjust token count
    });

    // Extract the AI reply
    const aiReply = response.generations[0].text || "No reply generated.";

    return {
      id: Date.now().toString(),
      content: aiReply,
      timestamp: new Date().toISOString(),
      type: 'ai',
    };

  } catch (error) {
    console.error('Error sending message to API:', error);
    return {
      id: Date.now().toString(),
      content: `Error: Unable to process request.`,
      timestamp: new Date().toISOString(),
      type: 'error',
    };
  }
};