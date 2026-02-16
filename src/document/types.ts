export type DocumentMetadata = {
  [key: string]: string | number | Date;
};

export type Metadata = {
  id: string;
  chunkIndex: number;
  totalChunks: number;
} & DocumentMetadata;

export type ChunkWithMetadata = {
  content: string;
  embedding: number[];
  metadata: Metadata;
};
