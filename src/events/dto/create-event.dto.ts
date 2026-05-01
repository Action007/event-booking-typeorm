import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateEventDto {
  @IsString() title: string
  @IsString() description: string
  @Type(() => Date) date: Date
  @IsInt() @Min(1) capacity: number
  @IsNumber() price: number
  @IsInt() categoryId: number
  @IsArray() @IsInt({ each: true }) @IsOptional() tagIds?: number[]
}
