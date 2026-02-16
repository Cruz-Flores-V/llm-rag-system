import { Injectable } from '@nestjs/common';

import {
  ChunkFromStorage,
  VectorStoreService,
} from '../../vector-store/services/vector-store.service';
import { ChunkWithMetadata, DocumentMetadata } from '../types';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { EmbeddingService } from '../../embedding/services/embedding.service';
import { SplitterService } from './splitter.service';

@Injectable()
export class DocumentService {
  constructor(
    private readonly splitterService: SplitterService,
    private readonly embeddingService: EmbeddingService,
    private readonly vectorStoreService: VectorStoreService,
  ) {}

  async add({ id, text, metadata }: CreateDocumentDto): Promise<void> {
    const chunks = await this.splitterService.splitText(text);
    const embeddings = await this.embeddingService.embedDocuments(chunks);
    const chunksWithMetadata: ChunkWithMetadata[] = chunks.map(
      (chunk, index) => ({
        content: chunk,
        embedding: embeddings[index],
        metadata: {
          ...metadata,
          id,
          chunkIndex: index,
          totalChunks: chunks.length,
        },
      }),
    );
    await this.vectorStoreService.addDocumentChunks(chunksWithMetadata);

    return void 0;
  }

  async search(
    question: string,
    metadataFilter?: DocumentMetadata,
    topK: number = 5,
  ): Promise<ChunkFromStorage[]> {
    const qEmbedding = await this.embeddingService.embedQuery(question);
    const chunks = await this.vectorStoreService.query(qEmbedding, {
      metadataFilter,
      topK,
    });

    return chunks;
  }
}
