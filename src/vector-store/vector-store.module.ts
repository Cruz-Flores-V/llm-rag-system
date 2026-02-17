import { Module } from '@nestjs/common';

import { VectorStoreService } from './services/vector-store.service';

@Module({
  providers: [VectorStoreService],
  exports: [VectorStoreService],
})
export class VectorStoreModule {}
