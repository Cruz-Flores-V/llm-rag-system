import { Injectable } from '@nestjs/common';

import { MarkdownTextSplitter } from '@langchain/textsplitters';

@Injectable()
export class SplitterService {
  private readonly splitter: MarkdownTextSplitter;

  constructor() {
    this.splitter = new MarkdownTextSplitter({
      chunkSize: 800,
      chunkOverlap: 160,
    });
  }

  async splitText(text: string): Promise<string[]> {
    return this.splitter.splitText(text);
  }
}
