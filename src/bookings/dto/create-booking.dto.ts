import { IsInt, IsString, Min } from 'class-validator'

export class CreateBookingDto {
  @IsString() eventId: string
  @IsInt() @Min(1) seats: number
  @IsInt() totalPrice: number
}
