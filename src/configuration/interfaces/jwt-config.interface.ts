export interface IJwtConfig {
  global?: boolean;
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}
