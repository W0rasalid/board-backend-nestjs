export interface ILokiLoggerConfig {
  lokiUrl: string;
  labels: ILokiLabelConfig;
  logToConsole: boolean;
  gzip: boolean;
}

export interface ILokiLabelConfig {
  product: string;
  enviroment: string;
}
