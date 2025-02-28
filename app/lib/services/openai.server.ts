import { getConfig } from "@/lib/config";
import OpenAI from "openai";

let client: OpenAI;

const getOpenAiClient = () => {
  if (!client) {
    client = new OpenAI({
      apiKey: getConfig().OPENAI_API_KEY
    });
  }
  return client;
};

export { getOpenAiClient };
