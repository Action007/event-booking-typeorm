import { IsInt, Min } from 'class-validator'

export class CreateBookingDto {
  @IsInt() eventId: number
  @IsInt() @Min(1) seats: number
  @IsInt() totalPrice: number
}
