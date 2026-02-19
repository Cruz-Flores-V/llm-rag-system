---
description: Load when generating or modifying backend code for this project, especially NestJS modules, repositories or services.
applyTo: '**/*.ts'
---

# Project Architecture Guidelines

This project follows:

- Hexagonal Architecture (Ports and Adapters)
- Dependency Inversion Principle
- Technology-independent business logic
- Replaceable infrastructure implementations

External technologies (databases, APIs, frameworks, etc.) must be replaceable without affecting business logic.

---

# Core Principles

- Business logic depends on abstractions.
- External systems are accessed through adapters.
- Implementations must be easily replaceable.
- Dependencies must be injected through abstractions.

---

# Dependency Injection Pattern (MANDATORY)

## Goal

Ensure loose coupling and replaceable implementations.

All dependencies must follow this injection pattern.

---

## Injection Rules

### Always depend on abstractions

Consumers must depend on abstract classes, never concrete implementations.

✅ Correct:

```ts
constructor(private readonly customerRepository: CustomerRepository) {}
```

❌ Incorrect:

```ts
constructor(private readonly repo: TypeOrmCustomerRepository) {}
```

---

### Use abstract classes as injection tokens

- Do not use interfaces as injection tokens.
- Use abstract classes for runtime resolution.

---

### Always register explicit provider mappings

Always map abstraction → implementation.

Example:

```ts
{
  provide: CustomerRepository,
  useClass: TypeOrmCustomerRepository,
}
```

<!-- ---

### Constructor Injection Only

- Always use constructor injection.
- Never manually instantiate dependencies.
- Never use service locator patterns. -->

---

### Implementation Replaceability

Changing technology should only require changing the provider binding.

Consumers must not change.

---

# Ports and Adapters Pattern

All integrations with external systems must follow:

```
abstraction (port) → implementation (adapter) → dependency injection binding
```

This applies to:

- databases
- external APIs
- queues
- caching
- storage
- authentication providers
- logging services
- messaging systems

---

# Repository Pattern (MANDATORY FOR PERSISTENCE)

## Goal

Encapsulate persistence behind a technology-independent abstraction.

Repositories are a specific type of port used for data persistence.

---

## Repository Contract

Repositories must be defined as **abstract classes**.

They represent persistence behavior, not implementation.

All repositories must have four basic methods: save, getOne, getAll, and delete.
For updates, we can use the save method by passing an entity with an existing ID.

Example:

```ts
export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
  abstract getOne(id: Id): Promise<Customer | null>;
  abstract getAll(filters?: ListCustomersQueryDto): Promise<Customer[]>;
  abstract delete(id: Id): Promise<void>;
}
```

Rules:

- No ORM dependencies.
- No framework imports.
- No infrastructure logic.
- Represents persistence operations only.

---

## Repository Implementation

Implementations must live in infrastructure and depend on technology.

Example:

```ts
export class TypeOrmCustomerRepository implements CustomerRepository {
  async save(customer: Customer): Promise<void> {}
  async getOne(id: Id): Promise<Customer | null> {}
  async getAll(filters?: ListCustomersQueryDto): Promise<Customer[]> {}
  async delete(id: Id): Promise<void> {}
}
```

Rules:

- May depend on ORM or framework.
- Must implement repository contract.
- Must not contain business logic.

---

# Naming Conventions

## Abstractions

```
XRepository
XService
XProvider
XClient
XGateway
```

---

## Implementations

Implementation names must reflect the technology used:

typeorm/repositories/customer-typeorm-repository.ts
in-memory/repositories/customer-in-memory-repository.ts

Implementation class names must reflect the technology used:

```
XTypeOrmRepository
XPrismaRepository
XHttpClient
XRedisCache
```

---

# What to Avoid

- Injecting concrete implementations.
- Framework or ORM dependencies in abstractions.
- Technology-specific code in business logic.
- Tight coupling to infrastructure.
- Manual dependency instantiation.
