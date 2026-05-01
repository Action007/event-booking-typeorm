import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import services, call them with hardcoded data
async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule)
  // const eventsService = app.get(EventsService)
  // ... insert data
  await app.close()
}
seed()
