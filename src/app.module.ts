import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { VectoreStoreModule } from './vectore-store/vectore-store.module';

@Module({
  imports: [DocumentModule, VectoreStoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
