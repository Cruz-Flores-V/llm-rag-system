import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';

import { envs } from '../../config';
import { EmbeddedChunk } from '../types';

@Injectable()
export class VectorStoreService {
  private readonly qdrantClient: QdrantClient;

  constructor() {
    this.qdrantClient = new QdrantClient({
      url: envs.qdrant.url,
      apiKey: envs.qdrant.apiKey,
    });
  }

  async addDocumentChunks(chunks: EmbeddedChunk[]): Promise<void> {
    if (!chunks.length) {
      return void 0;
    }
    const points = chunks.map((chunk) => ({
      id: crypto.randomUUID(),
      vector: chunk.embedding,
      payload: {
        content: chunk.content,
        metadata: chunk.metadata,
      },
    }));

    await this.qdrantClient.upsert(envs.qdrant.collectionName, {
      points,
    });

    return void 0;
  }
}
