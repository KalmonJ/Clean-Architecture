import z from "zod";

const envVariables = z.object({
  JWT_SECRET: z.string(),
  STRIPE_SECRET: z.string(),
  EMAIL: z.string(),
  PASSWORD: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export {};
