import { Module } from '@nestjs/common';

import { DocumentController } from './document.controller';
import { DocumentService } from './services/document.service';
import { EmbeddingsModule } from '../embeddings/embeddings.module';
import { SplitterService } from './services/splitter.service';
import { VectoreStoreModule } from '../vectore-store/vectore-store.module';

@Module({
  imports: [EmbeddingsModule, VectoreStoreModule],
  providers: [DocumentService, SplitterService],
  controllers: [DocumentController],
})
export class DocumentModule {}
