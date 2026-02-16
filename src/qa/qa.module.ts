import { Module } from '@nestjs/common';

import { DocumentModule } from 'src/document/document.module';
import { LlmModule } from 'src/llm/llm.module';
import { QaController } from './qa.controller';
import { QaService } from './services/qa.service';

@Module({
  imports: [DocumentModule, LlmModule],
  controllers: [QaController],
  providers: [QaService],
})
export class QaModule {}
