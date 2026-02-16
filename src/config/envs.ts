import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

type EnvVars = {
  PORT: number;
};
type EnvVarsSchema = {
  [K in keyof EnvVars]: joi.Schema;
};

const createEnvSchema = (schema: EnvVarsSchema): joi.ObjectSchema<EnvVars> => {
  return joi.object<EnvVars>(schema).unknown();
};
const envVarsSchema = createEnvSchema({
  PORT: joi.number().integer().required().description('Server port'),
});
const validationResult = envVarsSchema.validate(process.env);
if (validationResult.error) {
  throw new Error(
    `Environment variable validation error: ${validationResult.error.message}`,
  );
}
const envVars = validationResult.value;

export const envs = {
  port: envVars.PORT,
};
