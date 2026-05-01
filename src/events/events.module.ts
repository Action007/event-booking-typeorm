import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from './entities/event.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'
import { Booking } from '../bookings/entities/booking.entity'
import { Review } from '../reviews/entities/review.entity'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'

@Module({
  imports: [TypeOrmModule.forFeature([Event, Category, Tag, Booking, Review])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, TypeOrmModule],
})
export class EventsModule {}
