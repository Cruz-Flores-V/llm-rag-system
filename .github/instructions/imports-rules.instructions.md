---
description: Import rules for TypeScript/Node projects
applyTo: '**/*.ts'
---

- Order imports as follows:

```ts
// 1) third-party imports (alphabetically)
import { Module } from '@nestjs/common';

import { AppController } from './app.controller'; //we leave a blank line and add the app imports.
import { AppService } from './app.service';
```

- Do not use relative paths with more than two levels (`../../../`). Instead, configure `tsconfig.json` to use absolute paths with an alias (e.g., `@/`).
- Do not use `src/..` because it breaks the tests. Instead, use the alias configured in `tsconfig.json` (e.g., `@/`).
