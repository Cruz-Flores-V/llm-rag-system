import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { DocumentMetadata } from '../../common/types';

export class AskQuestionDto {
  @IsString()
  @IsNotEmpty()
  question!: string;

  @IsOptional()
  metadataFilter?: DocumentMetadata;

  @IsOptional()
  @IsNumber()
  topK?: number;
}
