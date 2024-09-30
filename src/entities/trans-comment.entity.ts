import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITransComment } from './interfaces/trans-comment.interface';
import { TransPostEntity } from './trans-post.entity';
import {
  ManyToOneRelationOptions,
  OneToOneRelationOptions,
} from 'src/common/entities/relation-option';
import { MasUsersEntity } from './mas-users.entity';

@Entity({ name: 'transComment' })
export class TransCommentEntity extends BaseEntity<ITransComment> implements ITransComment {
  @PrimaryGeneratedColumn({ name: 'commentId' })
  commentId: number;

  @Column({ name: 'postId', type: 'integer', nullable: true })
  postId?: number;

  @Column({ name: 'description', type: 'nvarchar', length: 'max', nullable: true })
  description: string;

  @Column({ name: 'isDelete', type: 'bit', nullable: true })
  isDelete: boolean;

  @ManyToOne(() => TransPostEntity, (item) => item.commentList, ManyToOneRelationOptions)
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  postRecord: TransPostEntity;

  @OneToOne(() => MasUsersEntity, (item) => item.commentList)
  userInfo: MasUsersEntity;

  relationKey(): (keyof ITransComment)[] {
    return ['postRecord', 'userInfo'];
  }
}
