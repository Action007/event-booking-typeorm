import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'

@Controller('events')
export class EventsController {
  constructor(private events: EventsService) {}

  @Get()
  findAll() {
    return this.events.findAllWithCategoryAndTags()
  }

  @Get('available')
  available() {
    return this.events.findAvailable()
  }

  @Get('top-rated')
  topRated(@Query('min', new ParseIntPipe()) min: number) {
    return this.events.findHighRated(min)
  }

  @Get('search')
  search(
    @Query('q') q: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.events.search(q, new Date(from), new Date(to))
  }

  @Get('paginated')
  paginated(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
  ) {
    return this.events.paginate(page, size)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.events.findOneWithBookingsAndUsers(id)
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.events.create(dto)
  }
}
