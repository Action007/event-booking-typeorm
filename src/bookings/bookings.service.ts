import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Booking } from './entities/booking.entity'
import { Event } from '../events/entities/event.entity'
import { User } from '../users/entities/user.entity'
import { CreateBookingDto } from './dto/create-booking.dto'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookings: Repository<Booking>,
    @InjectRepository(Event) private events: Repository<Event>,
    @InjectRepository(User) private users: Repository<User>,
    private dataSource: DataSource,
  ) {}

  // TODO 3.6 — createBooking with capacity check inside a transaction
  // Use this.dataSource.transaction(async (manager) => { ... })
  // Steps:
  //   1. Find event (throw NotFound if missing)
  //   2. Sum existing bookings for this event
  //   3. If bookedSoFar + dto.seats > event.capacity → throw BadRequestException('Sold out')
  //   4. Create + save booking
  //   5. Return saved booking
  // Catch unique constraint violation (err.code === '23505') → throw BadRequestException('Already booked')
  async create(userId: number, dto: CreateBookingDto) {
    void userId
    void dto
    // implement
  }

  // TODO 3.7 — cancelBooking
  // Steps inside transaction:
  //   1. Find booking with user + event relations
  //   2. If booking.user.id !== userId → ForbiddenException
  //   3. If booking.event.date < now → BadRequestException('Event already happened')
  //   4. Remove booking
  async cancel(userId: number, bookingId: number) {
    void userId
    void bookingId
    // implement
  }

  // TODO 3.8 — transfer ownership
  // Verify booking belongs to fromUserId, verify toUserId exists, change owner.
  // Watch out for unique constraint — toUserId might already have a booking for this event.
  async transfer(bookingId: number, fromUserId: number, toUserId: number) {
    void bookingId
    void fromUserId
    void toUserId
    // implement
  }
}
