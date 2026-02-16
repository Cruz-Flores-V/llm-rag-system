import { Body, Controller, Post } from '@nestjs/common';

import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentService } from './services/document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('add')
  add(
    @Body() { id, text, metadata }: CreateDocumentDto,
  ): ReturnType<DocumentService['add']> {
    return this.documentService.add({ id, text, metadata });
  }
}
