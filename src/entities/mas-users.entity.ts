import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TransPostEntity } from './trans-post.entity';
import {
  OneToManyRelationOptions,
  OneToOneRelationOptions,
} from 'src/common/entities/relation-option';
import { TransCommentEntity } from './trans-comment.entity';

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

  @Column({ name: 'googleId', type: 'nvarchar', length: 50, nullable: true })
  googleId: string;

  @OneToOne(() => TransPostEntity, (item) => item.userInfo, OneToOneRelationOptions)
  @JoinColumn({ name: 'userId', referencedColumnName: 'createId' })
  postInfo: TransPostEntity;

  @OneToOne(() => TransCommentEntity, (item) => item.userInfo, OneToOneRelationOptions)
  @JoinColumn({ name: 'userId', referencedColumnName: 'createId' })
  commentList: TransCommentEntity;
}
