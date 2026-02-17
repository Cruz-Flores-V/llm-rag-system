import { Injectable } from '@nestjs/common';

import { AskQuestionDto } from '../dto/ask-question.dto';
import { DocumentService } from '../../document/services/document.service';
import { LlmService } from '../../llm/services/llm.service';

@Injectable()
export class QaService {
  constructor(
    private readonly documentService: DocumentService,
    private readonly llmService: LlmService,
  ) {}

  async askQuestion({
    question,
    metadataFilter,
    topK,
  }: AskQuestionDto): Promise<string> {
    const chunks = await this.documentService.search(question, {
      metadataFilter,
      topK,
    });
    const context = chunks.map((c) => c.content).join('\n---\n');
    const prompt = `Contexto:\n${context}\n\nPregunta: ${question}`;

    return this.llmService.callModel(prompt);
  }
}
