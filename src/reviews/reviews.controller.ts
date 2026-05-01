import { Controller, Get } from '@nestjs/common'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
  constructor(private reviews: ReviewsService) {}

  @Get('placeholder')
  placeholder() {
    return []
  } // keep module happy
}
