import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('XB-Messenger documentation')
    .setDescription('XB-Messenger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(app.get(JwtService), reflector));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
