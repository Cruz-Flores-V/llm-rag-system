# LLM RAG System

NestJS API for Retrieval-Augmented Generation (RAG) using:

- **Google Vertex AI** for embeddings and chat completions
- **Qdrant** as vector database
- **LangChain** utilities for text splitting and model integrations

## What this service does

1. Receives documents through an HTTP endpoint.
2. Splits text into chunks.
3. Generates embeddings for each chunk.
4. Stores vectors + metadata in Qdrant.
5. Answers questions by retrieving relevant chunks and sending context to an LLM.

## Tech stack

- Node.js + NestJS (TypeScript)
- LangChain (`@langchain/google-vertexai`, `@langchain/textsplitters`)
- Qdrant (`@qdrant/js-client-rest`)
- Validation with `class-validator` + `class-transformer`

## Project structure

- `src/document`: ingestion flow (`/document/add`)
- `src/qa`: question-answer flow (`/qa/ask`)
- `src/embedding`: embedding provider integration
- `src/llm`: chat model integration
- `src/vector-store`: Qdrant persistence and similarity search
- `src/config`: environment parsing and validation

## Requirements

- Node.js 20+
- Yarn
- Docker (for local Qdrant)
- Google Cloud credentials with access to Vertex AI models

## Environment variables

Copy `.env.example` to `.env` and update values.

```bash
cp .env.example .env
```

Required vars used by the app:

- `PORT`
- `NODE_ENV` (`local` | `development` | `production`)
- `GOOGLE_CREDENTIALS_JSON` (full JSON string)
- `GOOGLE_EMBEDDING_MODEL` (Vertex embedding model name)
- `QDRANT_URL`
- `QDRANT_COLLECTION_NAME`
- `QDRANT_API_KEY` (required in `development` and `production`)

## Local setup

Install dependencies:

```bash
yarn install
```

Start Qdrant:

```bash
docker compose up -d
```

Run API in dev mode:

```bash
yarn start:dev
```

Server starts on `http://localhost:3000` by default.

## API endpoints

### `POST /document/add`

Ingest a document.

Request body:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "text": "Long document content...",
  "metadata": {
    "source": "api",
    "priority": 1
  }
}
```

Notes:

- `id` must be UUID
- `text` min length is 10
- `metadata` is optional object

### `POST /qa/ask`

Ask a question using retrieved context.

Request body:

```json
{
  "question": "What is this document about?",
  "metadataFilter": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "topK": 5
}
```

Returns plain text answer from the LLM.

## Useful files

- Qdrant reset script: `reset-qdrant-vector-store.sh`

## Reset Qdrant collection

This script deletes and recreates a collection named `documents` with vector size `768`:

```bash
./reset-qdrant-vector-store.sh
```

If you use this script, set `QDRANT_COLLECTION_NAME=documents` (or update the script to match your collection name).

## Scripts

- `yarn start:dev` - run in watch mode

