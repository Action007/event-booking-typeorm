import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookings: Repository<Booking>,
    @InjectRepository(Event) private events: Repository<Event>,
    @InjectRepository(User) private users: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const event = await manager.findOne(Event, {
          where: { id: dto.eventId },
        });

        if (!event) throw new NotFoundException('Event not found');

        const { bookedSoFar } = await manager
          .createQueryBuilder(Booking, 'b')
          .select('COALESCE(SUM(b.seats), 0)', 'bookedSoFar')
          .where('b.eventId = :id', { id: dto.eventId })
          .getRawOne();

        if (Number(bookedSoFar) + dto.seats > event.capacity) {
          throw new BadRequestException('Sold out');
        }

        const booking = manager.create(Booking, {
          seats: dto.seats,
          totalPrice: dto.totalPrice,
          user: { id: userId },
          event: { id: event.id },
        });

        return manager.save(booking);
      });
    } catch (err: any) {
      if (err.code === '23505') throw new BadRequestException('Already booked');
      throw err;
    }
  }

  async cancel(userId: string, bookingId: string) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const booking = await manager.findOne(Booking, {
          where: { id: bookingId },
          relations: ['user', 'event']
        });

        if (!booking) throw new NotFoundException('Booking not found');
        if (booking.user.id !== userId)
          throw new ForbiddenException('Dont have access');
        if (booking.event.date < new Date())
          throw new BadRequestException('Event already happened');

        return await manager.remove(booking);
      });
    } catch (err: any) {
      if (err.code === '23505') throw new BadRequestException();
      throw err;
    }
  }

  async transfer(bookingId: number, fromUserId: number, toUserId: number) {
    
  }
}
