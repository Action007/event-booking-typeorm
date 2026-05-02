import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Booking) private bookings: Repository<Booking>,
  ) {}

  async bookingsForUser(userId: string) {
    return await this.bookings.find({
      relations: ['event'],
      where: { user: { id: userId } },
    });
  }

  async topBookers() {
    return await this.users
      .createQueryBuilder('u')
      .select('u.name', 'name')
      .addSelect('u.email', 'email')
      .addSelect('COUNT(b.id)', 'bookingCount')
      .leftJoin('u.bookings', 'b')
      .groupBy('u.id, u.name, u.email')
      .orderBy('COUNT(b.id)', 'DESC')
      .limit(5)
      .getRawMany();
  }
}
