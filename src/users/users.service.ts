import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Booking } from '../bookings/entities/booking.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Booking) private bookings: Repository<Booking>,
  ) {}

  // TODO 2.5 — bookings for a user, with event details loaded
  async bookingsForUser(userId: number) {
    void userId
    // implement
  }

  // TODO 3.5 — top 5 users by booking count (QueryBuilder, COUNT, GROUP BY)
  async topBookers() {
    // implement
  }
}
