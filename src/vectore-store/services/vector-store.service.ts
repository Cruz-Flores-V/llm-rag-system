import { Injectable } from '@nestjs/common';

import { EmbeddedChunk } from '../types';

@Injectable()
export class VectorStoreService {
  async addDocumentChunks(chunks: EmbeddedChunk[]): Promise<void> {
    const points = chunks.map((chunk) => ({
      id: crypto.randomUUID(),
      vector: chunk.embedding,
      payload: {
        content: chunk.content,
        metadata: chunk.metadata,
      },
    }));
    console.log({ points });
    return void 0;
  }
}
