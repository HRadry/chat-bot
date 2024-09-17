import dotenv from 'dotenv';
dotenv.config();

export function envString(name: string, defaultValue?: string): string {
  const envValue = process.env[name];

  if (envValue) return envValue;
  if (defaultValue) return defaultValue;

  throw new Error(`Environment variable ${name} must be set.`);
}