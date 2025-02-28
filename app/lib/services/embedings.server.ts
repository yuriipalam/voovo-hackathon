import OpenAI from "openai";
import { getConfig } from "@/lib/config";

/**
 * Embed a piece of text using an embedding model or service.
 * This is a placeholder and needs to be implemented based on your embedding solution.
 *
 * @param chunks
 * @returns The embedded representation of the text.
 */
export async function embedChunks(chunks: string[]): Promise<any> {
  // You can use any embedding model or service here.
  const openai = new OpenAI({
    apiKey: getConfig().OPENAI_API_KEY
  });
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: chunks,
      encoding_format: "float"
      // dimensions: 1536
    });
    return response.data;
  } catch (error) {
    console.error("Error embedding text with OpenAI:", error);
    throw error;
  }
}
