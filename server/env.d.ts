declare namespace NodeJS {
  interface ProcessEnv {
    PORT: 3000;
    SECRET_KEY: string;
    NODE_ENV?: "development" | "production";
    RESEND_API_KEY?: string;
  }
}
