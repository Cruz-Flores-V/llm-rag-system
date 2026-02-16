import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { VectorStoreModule } from './vector-store/vector-store.module';

@Module({
  imports: [DocumentModule, VectorStoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
