export type EmbeddedChunk = {
  content: string;
  embedding: number[];
  metadata: { [key: string]: string | number | Date };
};
