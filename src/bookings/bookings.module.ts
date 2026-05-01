import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from './entities/booking.entity'
import { Event } from '../events/entities/event.entity'
import { User } from '../users/entities/user.entity'
import { BookingsController } from './bookings.controller'
import { BookingsService } from './bookings.service'

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Event, User])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
