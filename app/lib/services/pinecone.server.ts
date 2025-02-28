import {
  Pinecone,
  PineconeRecord,
  RecordMetadata
} from "@pinecone-database/pinecone";
import { getConfig } from "@/lib/config";
import { embedChunks } from "@/lib/services/embedings.server";

const pc = new Pinecone({
  apiKey: getConfig().PINECONE_API_KEY
});

export interface MatchMetadata extends RecordMetadata {
  text: string;
  fromLine: number;
  toLine: number;
  page: number;
}

export interface Chunk {
  id: string; // Composite ID: 'documentId#chunkId'
  values: number[]; // Embedding vector
  text: string; // Raw text of the chunk
  fromLine: number;
  toLine: number;
  page: number;
}

export interface Document {
  documentId: string;
  chunks: Chunk[];
}

const indexName = getConfig().PINECONE_INDEX_NAME;
const index = pc.index(indexName);

/**
 * Represents a model for managing documents in a namespace.
 */
export class DocumentModel {
  /**
   * Upserts a document into the specified Pinecone namespace.
   * @param document - The document to upsert.
   * @param namespaceId - The ID of the namespace, conversation ID in our case.
   */
  async upsertDocument({
    document,
    namespaceId
  }: {
    document: Document;
    namespaceId: string;
  }) {
    // Adjust to use namespaces if you're organizing data that way
    const namespace = index.namespace(namespaceId);

    const vectors: PineconeRecord<MatchMetadata>[] = document.chunks.map(
      (chunk) => ({
        id: chunk.id,
        values: chunk.values,
        metadata: {
          text: chunk.text,
          fromLine: chunk.fromLine,
          toLine: chunk.toLine,
          page: chunk.page
        }
      })
    );

    // Batch the upsert operation
    const batchSize = 200;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await namespace.upsert(batch);
    }
  }

  /**
   * Finds documents or chunks that match the provided text string.
   * @param queryText - The text string to search for.
   * @param namespaceId - The ID of the namespace, conversation ID in our case.
   * @param topK - The number of top matches to return.
   * @returns A promise that resolves to the list of matching chunk IDs and their metadata.
   */
  async findMatches({
    queryText,
    namespaceId,
    topK = 4
  }: {
    queryText: string;
    namespaceId: string;
    topK: number;
  }): Promise<{ id: string; score?: number; metadata: MatchMetadata }[]> {
    // Step 1: Generate the embedding for the input string
    const [embedding] = await embedChunks([queryText]);

    // Step 2: Query Pinecone with the embedding
    const namespace = index.namespace(namespaceId);
    const queryResult = await namespace.query({
      topK,
      vector: embedding.embedding, // Use the embedding from OpenAI
      includeMetadata: true
    });

    // Step 3: Process and return the results
    return (
      queryResult.matches?.map((match) => ({
        id: match.id,
        score: match.score,
        metadata: match.metadata as MatchMetadata
      })) || []
    );
  }

  /**
   * Deletes the specified chunk IDs from the namespace.
   * @param chunkIds - The IDs of the chunks to delete.
   * @param namespaceId - The ID of the namespace.
   */
  async deleteDocumentChunks(chunkIds: string[], namespaceId: string) {
    console.log("Deleting Document Chunks");
    const namespace = index.namespace(namespaceId);
    await namespace.deleteMany(chunkIds);
  }

  /**
   * Deletes a Pinecone namespace.
   *
   * @param namespaceId - The ID of the namespace to delete.
   * @returns A Promise that resolves when the namespace is deleted successfully.
   */
  async deletePineconeNamespace(namespaceId: string) {
    console.log("Deleting Workspace");
    const namespace = index.namespace(namespaceId);
    await namespace.deleteAll();
    console.log("Workspace deleted from Pinecone successfully");
  }
}
