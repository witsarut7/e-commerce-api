import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { SwaggerSetting } from './config/swagger-setting';
import { TransformInterceptor } from './shared/transform-interceptor';
import { AllExceptionsFilter } from './shared/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(process.env.SERVICE_PREFIX);
  SwaggerSetting(app);

  app.use(morgan('dev'));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });

  await app.listen(process.env.SERVICE_PORT || 3000);
  console.log(`service start on ${await app.getUrl()}`);
}
bootstrap();
