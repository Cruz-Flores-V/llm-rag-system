import { DocumentMetadata } from '../document/types';

export type EmbeddedChunk = {
  content: string;
  embedding: number[];
  metadata: DocumentMetadata;
};
