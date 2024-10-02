import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './configuration/interfaces/app-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import otelSDK from './core/observability/opentelemetry/telemetry';
import * as swaggerStats from 'swagger-stats';

async function bootstrap() {
  otelSDK.start();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  //Swagger
  if (appConfig.swaggerEnable) {
    const options = new DocumentBuilder()
      .setTitle('Board API Service')
      .setDescription(
        `
            Language: Node Typescript
            FrameWork: Nest JS Framework
            Node Version: ^20
            ------------------------------------------
            Environment: ${appConfig.apiEnvirontment}
            API Version: ${appConfig.apiVersion}
            LastUpdate: ${appConfig.apiLastUpdate}
            ------------------------------------------
            Author: ${appConfig.apiAuthor}
            Contacts: ${appConfig.apiAuthorEmail}
            ------------------------------------------
            Diagram URL: https://dbdocs.io/Worasalid%20Juicharoen/Board
            Diagram Password: Interview2024
            `,
      )
      .setVersion(appConfig.apiVersion)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-doc', app, document);
  }

  //Swagger Stats
  app.use(
    swaggerStats.getMiddleware({
      name: 'a Board Stats',
      swaggerSpec: null,
      hostname: 'localhost',
      uriPath: '/monitor',
      authentication: true,
      onAuthenticate: function (req, username, password) {
        // check for username and password
        if (username === appConfig.swaggerStatsUser && password === appConfig.swaggerStatsPass) {
          return true;
        }
      },
    }),
  );

  await app.init();
  await app.listen(appConfig.port || 4000);
  console.log(`server running on port: ${appConfig.port}`);
}
bootstrap();
