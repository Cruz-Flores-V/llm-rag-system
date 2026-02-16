import { Injectable } from '@nestjs/common';

import { ChunkWithMetadata } from '../types';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { EmbeddingService } from '../../embeddings/services/embedding.service';
import { SplitterService } from './splitter.service';
import { VectorStoreService } from '../../vectore-store/services/vector-store.service';

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
}
