import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { CreateBookingDto } from './dto/create-booking.dto'

@Controller('bookings')
export class BookingsController {
  constructor(private bookings: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookings.create("f2e948c5-099b-463d-a054-3583dec2f640", dto)
  }

  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: string) {
    return this.bookings.cancel("f8f53a39-5ac7-45c5-9a09-d0acc2a20a75", id)
  }

  @Post(':id/transfer/:toUserId')
  transfer(
    @Param('id', ParseIntPipe) id: number,
    @Param('toUserId', ParseIntPipe) toUserId: number,
  ) {
    return this.bookings.transfer(id, 1, toUserId)
  }
}
