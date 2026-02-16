import { ChatVertexAI } from '@langchain/google-vertexai';
import { Injectable } from '@nestjs/common';

import { envs } from 'src/config';

@Injectable()
export class LlmService {
  private readonly chat: ChatVertexAI;

  constructor() {
    const credentials = envs.google.credentials;
    this.chat = new ChatVertexAI({
      model: 'gemini-2.5-flash',
      temperature: 0.3,
      authOptions: {
        projectId: credentials?.project_id,
        credentials: credentials && {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      },
    });
  }

  async callModel(prompt: string): Promise<string> {
    const result = await this.chat.invoke(prompt);

    return result.content as string;
  }
}
