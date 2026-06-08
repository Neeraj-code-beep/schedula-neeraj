import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PatientProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  contactDetails: string;

  @Column({ nullable: true })
  healthInfo: string;

  @Column({ unique: true })
  userId: number;
}
