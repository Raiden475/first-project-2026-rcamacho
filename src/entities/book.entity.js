import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  title;

  @Column()
  author;

  @Column({ type: 'text', nullable: true })
  description;

  @Column({ nullable: true })
  cover;
}
