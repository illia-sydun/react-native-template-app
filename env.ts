import { z } from 'zod';

const envSchema = z.object({
    EXPO_PUBLIC_ENV_VARIABLE: z.string().min(1),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    const errorMessage = `There is an error with the server environment variables: ${JSON.stringify(
        env.error.issues,
    )}`;

    throw new Error(errorMessage);
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}
