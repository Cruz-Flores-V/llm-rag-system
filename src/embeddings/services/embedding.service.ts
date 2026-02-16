import { VertexAIEmbeddings } from '@langchain/google-vertexai';
import { Injectable } from '@nestjs/common';

import { envs } from '../../config';

@Injectable()
export class EmbeddingService {
  private readonly embeddings: VertexAIEmbeddings;

  constructor() {
    const credentials = envs.google.credentials;
    this.embeddings = new VertexAIEmbeddings({
      model: envs.google.embeddingModel,
      authOptions: {
        projectId: credentials?.project_id,
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      },
    });
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    return this.embeddings.embedDocuments(documents);
  }
}
