import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { LlmModule } from './llm/llm.module';
import { QaModule } from './qa/qa.module';
import { VectorStoreModule } from './vector-store/vector-store.module';

@Module({
  imports: [
    DocumentModule,
    EmbeddingModule,
    VectorStoreModule,
    LlmModule,
    QaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
