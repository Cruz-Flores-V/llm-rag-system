import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbeddingService {
  async embedDocuments(documents: string[]): Promise<number[][]> {
    return documents.map((_, index) => [
      0.1 + index,
      0.2 + index,
      0.3 + index,
      0.4 + index,
    ]);
  }
}
