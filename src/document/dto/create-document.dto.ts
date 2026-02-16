import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { DocumentMetadata } from '../types';

export class CreateDocumentDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  text!: string;

  @IsOptional()
  @IsObject()
  metadata?: DocumentMetadata = {};
}
