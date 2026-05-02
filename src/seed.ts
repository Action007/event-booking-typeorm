import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule)
  await app.close()
}
seed()
