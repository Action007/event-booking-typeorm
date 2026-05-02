import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Event } from './entities/event.entity';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Review } from '../reviews/entities/review.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private events: Repository<Event>,
    @InjectRepository(Category) private categories: Repository<Category>,
    @InjectRepository(Tag) private tags: Repository<Tag>,
    @InjectRepository(Booking) private bookings: Repository<Booking>,
    @InjectRepository(Review) private reviews: Repository<Review>,
    private dataSource: DataSource,
  ) {}

  async findAllWithCategoryAndTags() {
    const events = await this.events.find({ relations: ['tags', 'category'] });
    return events;
  }

  async findOneWithBookingsAndUsers(id: string) {
    const event = await this.events.findOne({
      relations: ['bookings', 'bookings.user'],
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  // issues 1+N queries: one for all events, then one per event for bookings
  async badEventList() {
    const events = await this.events.find();
    for (const event of events) {
      const bookings = await this.bookings.find({
        where: { event: { id: event.id } },
      });
      console.log(`${event.title} has ${bookings.length} bookings`);
    }

    return events;
  }

  async goodEventList() {
    const events = await this.events.find({ relations: ['bookings.user'] });
    return events;
  }

  async findHighRated(min: number) {
    return this.events
      .createQueryBuilder('e')
      .select('e.title', 'title')
      .addSelect('AVG(r.rating)', 'avgRating')
      .leftJoin('e.reviews', 'r')
      .groupBy('e.id, e.title')
      .having('AVG(r.rating) > :min', { min })
      .getRawMany();
  }

  async findAvailable() {
    return this.events
      .createQueryBuilder('e')
      .select('e.title', 'title')
      .addSelect('e.capacity', 'capacity')
      .leftJoin('e.bookings', 'b')
      .groupBy('e.id, e.title, e.capacity')
      .having('e.capacity - COALESCE(SUM(b.seats), 0) > 0')
      .getRawMany();
  }

  async search(q: string, from: Date, to: Date) {
    return this.events
      .createQueryBuilder('e')
      .select('e.title', 'title')
      .addSelect('e.date', 'date')
      .where('e.title ILIKE :q', { q: `%${q}%` })
      .andWhere('e.date BETWEEN :from AND :to', { from, to })
      .getRawMany();
  }

  async paginate(page: number, size: number) {
    const [items, total] = await this.events
      .createQueryBuilder('e')
      .orderBy('e.date', 'DESC')
      .skip(page * size)
      .take(size)
      .getManyAndCount();

    return { items, total, page, size };
  }

  async create(dto: CreateEventDto) {
  }
}
