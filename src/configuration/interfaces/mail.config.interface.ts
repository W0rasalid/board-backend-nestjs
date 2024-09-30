export interface IEmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: IEmailAuthConfig;
}

export interface IEmailAuthConfig {
  user: string;
  pass: string;
}
