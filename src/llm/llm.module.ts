import { Module } from '@nestjs/common';

import { LlmService } from './services/llm.service';

@Module({
  imports: [],
  providers: [LlmService],
  exports: [LlmService],
})
export class LlmModule {}
