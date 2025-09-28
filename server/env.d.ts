declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SECRET: string;
    NODE_ENV?: "development" | "production";
    RESEND_API_KEY: string;
  }
}
