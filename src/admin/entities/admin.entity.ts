import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Samiyya',
    description: "User's name",
  })
  @Column()
  first_name: string;

  @ApiProperty({
    example: 'Azizkhanova',
    description: "User's last_name",
  })
  @Column()
  last_name: string;

  @ApiProperty({
    example: 24,
    description: "User's age",
  })
  @Column()
  age: number;

  @ApiProperty({
    example: 'samiyya@gamil.com',
    description: "User's email",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '+998907621314',
    description: "User's phone number",
  })
  @Column()
  phone_number: string;

  @ApiProperty({
    example: 'Andijon viloyati',
    description: "User's addres",
  })
  @Column()
  addres: string;

  @ApiProperty({
    example: 'female',
    description: "User's gender",
  })
  @Column()
  gender: string;

  @ApiProperty({
    example: false,
    description: 'Checked user is activated',
  })
  @Column({ nullable: true, default:false })
  is_active: boolean;

  @Column({ nullable: true })
  hashed_refresh_token: string;

  @Column({ nullable: true })
  hashed_password: string;

  @Column({ nullable: true })
  activation_link: string;
}
