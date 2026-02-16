export type DocumentMetadata = {
  [key: string]: string | number | Date;
};

type Metadata = {
  id: string;
  chunkIndex: number;
  totalChunks: number;
} & DocumentMetadata;

export type ChunkWithMetadata = {
  content: string;
  embedding: number[];
  metadata: Metadata;
};
