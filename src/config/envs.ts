import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

type GoogleCredentials = {
  project_id: string;
  client_email: string;
  private_key: string;
};
type EnvVars = {
  PORT: number;
  NODE_ENV: 'local' | 'development' | 'production';
  GOOGLE_CREDENTIALS_JSON: string;
  GOOGLE_EMBEDDING_MODEL: string;
  QDRANT_URL: string;
  QDRANT_COLLECTION_NAME: string;
  QDRANT_API_KEY?: string;
};
type EnvVarsSchema = {
  [K in keyof EnvVars]: joi.Schema;
};

const createEnvSchema = (schema: EnvVarsSchema): joi.ObjectSchema<EnvVars> => {
  return joi.object<EnvVars>(schema).unknown();
};
const envVarsSchema = createEnvSchema({
  PORT: joi.number().integer().required().description('Server port'),
  NODE_ENV: joi
    .string()
    .valid('local', 'development', 'production')
    .default('local')
    .description('Application environment'),
  GOOGLE_EMBEDDING_MODEL: joi
    .string()
    .required()
    .description('Model to use for text embeddings'),
  GOOGLE_CREDENTIALS_JSON: joi
    .string()
    .required()
    .description('Google Cloud credentials in JSON format'),
  QDRANT_URL: joi.string().required().description('Qdrant server URL'),
  QDRANT_COLLECTION_NAME: joi
    .string()
    .required()
    .description('Qdrant collection name'),
  QDRANT_API_KEY: joi
    .string()
    .when('NODE_ENV', {
      is: joi.valid('development', 'production'),
      then: joi.required(),
      otherwise: joi.optional(),
    })
    .description('Qdrant API key (required in development and production)'),
});
const validationResult = envVarsSchema.validate(process.env);
if (validationResult.error) {
  throw new Error(
    `Environment variable validation error: ${validationResult.error.message}`,
  );
}
const envVars = validationResult.value;
const parseGoogleCredentials = (value: string): GoogleCredentials => {
  try {
    const { client_email, private_key, project_id } = JSON.parse(
      value,
    ) as Partial<GoogleCredentials>;
    if (!project_id || !client_email || !private_key) {
      throw new Error(
        'Invalid GOOGLE_CREDENTIALS_JSON: missing required fields (project_id, client_email, private_key)',
      );
    }
    return {
      project_id,
      client_email,
      private_key,
    };
  } catch {
    throw new Error(
      'Invalid GOOGLE_CREDENTIALS_JSON: must be a valid JSON string',
    );
  }
};
export const envs = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  google: {
    embeddingModel: envVars.GOOGLE_EMBEDDING_MODEL,
    credentials: parseGoogleCredentials(envVars.GOOGLE_CREDENTIALS_JSON),
  },
  qdrant: {
    url: envVars.QDRANT_URL,
    apiKey: envVars.QDRANT_API_KEY,
    collectionName: envVars.QDRANT_COLLECTION_NAME,
  },
};
