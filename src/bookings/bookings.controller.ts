import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { CreateBookingDto } from './dto/create-booking.dto'

@Controller('bookings')
export class BookingsController {
  constructor(private bookings: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    // hardcode userId=1 for now — auth is out of scope for this exercise
    return this.bookings.create(1, dto)
  }

  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.bookings.cancel(1, id)
  }

  @Post(':id/transfer/:toUserId')
  transfer(
    @Param('id', ParseIntPipe) id: number,
    @Param('toUserId', ParseIntPipe) toUserId: number,
  ) {
    return this.bookings.transfer(id, 1, toUserId)
  }
}
