import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Description of the API')
    .setVersion('1')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  })

  // Validation
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
