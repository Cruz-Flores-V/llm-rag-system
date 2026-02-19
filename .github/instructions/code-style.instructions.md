---
description: Code style rules for TypeScript/Node projects
applyTo: '**/*.ts'
---

- Never use _if/else_; prefer _early returns_ and extract logic into helper functions.
- If a function doesn't return anything, use `return void 0;`.
- Interfaces are only used for class contracts; `type` is preferred.
- Enums are named in PascalCase; example:

```ts
export enum DocumentType {
  Transcription = 'transcription',
}
```

- Never use `public` explicitly in class methods.
- Enums must not use prefixes like `E`, `Enum`, or `Type`. Use only a descriptive name in PascalCase.
- Enum values must be in lowercase `snake_case`.
- Methods and functions must always have an explicit return type; return type inference is not allowed.
- Types must always be declared; inline typing is not permitted, for example:

```ts
// not allowed
function add(params: { a: number; b: number }) {
  return params.a + params.b;
}

// allowed
type AddParams = {
  a: number;
  b: number;
};
function add(params: AddParams): number {
  return params.a + params.b;
}
```

- for controllers, the output typing is as follows

```ts
@Controller('chatbots')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  create(
    @Body() dto: CreateChatbotDto,
  ): ReturnType<typeof this.chatbotService.create> {
```

- we don't use `if` without braces; braces must always be used even for single-line blocks.
