import { Module } from '@nestjs/common';

import { DocumentController } from './document.controller';
import { DocumentService } from './services/document.service';
import { EmbeddingModule } from '../embedding/embedding.module';
import { SplitterService } from './services/splitter.service';
import { VectorStoreModule } from '../vector-store/vector-store.module';

@Module({
  imports: [EmbeddingModule, VectorStoreModule],
  providers: [DocumentService, SplitterService],
  controllers: [DocumentController],
})
export class DocumentModule {}
