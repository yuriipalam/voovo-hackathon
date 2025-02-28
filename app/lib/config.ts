interface Config {
  OPENAI_API_KEY: string;
  PINECONE_API_KEY: string;
  PINECONE_INDEX_NAME: string;
}

let config: Config;

export const getConfig = () => {
  if (config) {
    return config;
  }

  config = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY!,
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME!
  };

  Object.entries(config).forEach(([key, value]) => {
    if (value === undefined) {
      throw new Error(`${key} environment variable is missing.`);
    }
    if (isNaN(value) && typeof value === "number") {
      throw new Error(`${key} environment variable is invalid type`);
    }
  });

  return config;
};
