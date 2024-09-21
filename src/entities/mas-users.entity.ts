import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'masUsers' })
export class MasUsersEntity {
  @PrimaryGeneratedColumn({ name: 'userId' })
  userId: number;

  @Column({ name: 'userName', type: 'nvarchar', length: 255, nullable: true })
  userName: string;

  @Column({ name: 'password', type: 'nvarchar', length: 255, nullable: true })
  password: string;

  @Column({ name: 'firstName', type: 'nvarchar', length: 100, nullable: true })
  firstName: string;

  @Column({ name: 'lastName', type: 'nvarchar', length: 100, nullable: true })
  lastName: string;

  @Column({ name: 'email', type: 'nvarchar', length: 100, nullable: true })
  email: string;

  @Column({ name: 'gender', type: 'nvarchar', length: 1, nullable: true })
  gender: string;

  @Column({ name: 'profileImage', type: 'nvarchar', length: 255, nullable: true })
  profileImage: string;

  @Column({ name: 'userRole', type: 'nvarchar', length: 10, nullable: true })
  userRole: string;

  @Column({ name: 'isActive', type: 'bit', nullable: true })
  isActive: boolean;

  @Column({ name: 'isDelete', type: 'bit', nullable: true })
  isDelete: boolean;

  @Column({ name: 'registerDate', type: 'datetime', nullable: true })
  registerDate: Date;

  @Column({ name: 'createDate', type: 'datetime', nullable: true })
  createDate: Date;

  @Column({ name: 'modifyDate', type: 'datetime', nullable: true })
  modifyDate: Date;
}
