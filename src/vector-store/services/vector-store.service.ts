import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';

import { ChunkFromStorage, EmbeddedChunk } from '../types';
import { DocumentMetadata, QueryOptions } from '../../common/types';
import { envs } from '../../config';

type Filter = {
  must: Array<{ key: string; match: DocumentMetadata }>;
};

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

  async query(
    embedding: number[],
    { metadataFilter, topK = 5 }: QueryOptions = {},
  ): Promise<ChunkFromStorage[]> {
    const searchResult = await this.qdrantClient.search(
      envs.qdrant.collectionName,
      {
        vector: embedding,
        limit: topK,
        ...(metadataFilter ? { filter: this.buildFilter(metadataFilter) } : {}),
      },
    );
    const docs = searchResult.map((point) => {
      const { content, metadata } = point.payload as {
        content: string;
        metadata: DocumentMetadata;
      };
      return {
        content,
        metadata,
        score: point.score,
      };
    });

    return docs;
  }

  private buildFilter(metadata: DocumentMetadata): Filter {
    const conditions = Object.entries(metadata).map(([key, value]) => ({
      key: `metadata.${key}`,
      match: { value },
    }));

    return {
      must: conditions,
    };
  }
}
