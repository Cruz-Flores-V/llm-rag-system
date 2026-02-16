import { Body, Controller, Post } from '@nestjs/common';

import { AskQuestionDto } from './dto/ask-question.dto';
import { QaService } from './services/qa.service';

@Controller('qa')
export class QaController {
  constructor(private readonly qaService: QaService) {}

  @Post('ask')
  async askQuestion(@Body() askQuestionDto: AskQuestionDto): Promise<string> {
    return this.qaService.askQuestion(askQuestionDto);
  }
}
