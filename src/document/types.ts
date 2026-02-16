export type DocumentMetadata = {
  [key: string]: string | number | Date;
};

type ExtendableMetadata<T extends object> = T & DocumentMetadata;

type Metadata = ExtendableMetadata<{
  id: string;
  chunkIndex: number;
  totalChunks: number;
}>;

export type ChunkWithMetadata = {
  content: string;
  embedding: number[];
  metadata: Metadata;
};
