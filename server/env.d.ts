declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SECRET: string;
    NODE_ENV?: "development" | "production";
  }
}
