import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DoctorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column()
  qualification: string;

  @Column()
  consultationFee: number;

  @Column()
  availability: string;

  @Column()
  profileDetails: string;

  @Column({ unique: true })
  userId: number;
}
