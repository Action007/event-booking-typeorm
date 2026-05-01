import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Event } from './entities/event.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'
import { Booking } from '../bookings/entities/booking.entity'
import { Review } from '../reviews/entities/review.entity'
import { CreateEventDto } from './dto/create-event.dto'

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

  // TODO 2.1
  async findAllWithCategoryAndTags() {
    // events + category + tags loaded. Use this.events.find({ relations: [...] })
  }

  // TODO 2.2
  async findOneWithBookingsAndUsers(id: number) {
    void id
    // event + bookings + each booking's user (nested, 2 levels)
    // throw NotFoundException if not found
  }

  // TODO 2.3 — N+1 demonstration (write the BAD version first)
  async badEventList() {
    const events = await this.events.find()
    for (const event of events) {
      const bookings = await this.bookings.find({ where: { event: { id: event.id } } })
      console.log(`${event.title} has ${bookings.length} bookings`)
    }
    // RUN THIS ENDPOINT and count queries in the logs
  }

  // TODO 2.4 — fix it. Same output, ONE query.
  async goodEventList() {
    // load events with bookings in one query
  }

  // ----- Part 3 methods below -----
  async findHighRated(min: number) {
    void min
    /* TODO 3.1 */
  }

  async findAvailable() {
    /* TODO 3.2 */
  }

  async search(q: string, from: Date, to: Date) {
    void q
    void from
    void to
    /* TODO 3.3 */
  }

  async paginate(page: number, size: number) {
    void page
    void size
    /* TODO 3.4 */
  }

  // ----- create + transactions go below -----
  async create(dto: CreateEventDto) {
    void dto
    // Find category, throw if missing
    // Find tags by id (this.tags.findBy({ id: In(dto.tagIds) }))
    // Create event with category + tags attached
    // Save and return with relations populated
  }
}
