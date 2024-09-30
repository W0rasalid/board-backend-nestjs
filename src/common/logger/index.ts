import { Logger as NestLogger } from '@nestjs/common';

export class Logger extends NestLogger {
  constructor(context: string) {
    super(context, { timestamp: true });
  }

  private getDataLog(data: any) {
    try {
      if (data !== undefined) {
        if (data && data.stack && data.message) {
          //Error
          const getObject = (d) =>
            Object.getOwnPropertyNames(d).reduce((acc, curr) => {
              acc[curr] = d[curr];
              return acc;
            }, {});
          const obj = getObject(data);
          return obj;
        } else {
          return JSON.parse(JSON.stringify(data));
        }
      } else {
        return `${data}`;
      }
    } catch (err) {
      this.error('error logger', err);
      return 'error logger';
    }
  }

  log(message: string) {
    super.log(message);
  }

  logStart(context: string) {
    this.log(`start ${context}`);
  }

  logEnd(context: string) {
    this.log(`end ${context}`);
  }

  error(context: string, error: any) {
    super.error({
      context,
      error: this.getDataLog(error),
    });
  }

  debug(context: string, data: any) {
    super.debug({
      context,
      data: this.getDataLog(data),
    });
  }
}
