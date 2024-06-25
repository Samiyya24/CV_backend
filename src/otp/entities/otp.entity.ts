import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  otp_id: string;
  @Column()
  otp: string;
  @Column()
  expiration_time: Date;
  @Column()
  verified: boolean;
  @Column()
  check: string;
}
