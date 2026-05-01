import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Index()
  @Column()
  date: Date;

  @Column()
  capacity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Index()
  @ManyToOne(() => Category, (category) => category.events, {
    onDelete: 'RESTRICT',
  })
  category: Category;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.event)
  reviews: Review[];

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.events)
  tags: Tag[];
}
