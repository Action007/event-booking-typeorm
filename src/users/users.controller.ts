import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('top-bookers')
  topBookers() {
    return this.users.topBookers()
  }

  @Get(':id/bookings')
  myBookings(@Param('id', ParseIntPipe) id: number) {
    return this.users.bookingsForUser(id)
  }
}
