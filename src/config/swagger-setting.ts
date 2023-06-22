import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerSetting(app: INestApplication) {
  const docs = new DocumentBuilder()
    .setTitle('expense-manager-api')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, docs);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
