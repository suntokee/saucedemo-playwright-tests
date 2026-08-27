import 'dotenv/config';

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to your .env file.`,
    );
  }

  return value;
}

export const ENV = {
  sauceUser: requiredEnv('SAUCE_USER'),
  saucePassword: requiredEnv('SAUCE_PASSWORD'),
} as const;
