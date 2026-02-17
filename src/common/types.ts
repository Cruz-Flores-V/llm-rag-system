export type DocumentMetadata = {
  [key: string]: string | number | Date;
};

export type QueryOptions = {
  metadataFilter?: DocumentMetadata;
  topK?: number;
};
