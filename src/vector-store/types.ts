import { DocumentMetadata } from '../common/types';

export type EmbeddedChunk = {
  content: string;
  embedding: number[];
  metadata: DocumentMetadata;
};

export type ChunkFromStorage = Pick<EmbeddedChunk, 'content' | 'metadata'> & {
  score: number;
};
