import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITransPost } from './interfaces/trans-post.interface';
import { MasCategoryEntity } from './mas-category.entity';
import {
  OneToManyRelationOptions,
  OneToOneRelationOptions,
} from 'src/common/entities/relation-option';
import { MasUsersEntity } from './mas-users.entity';
import { TransCommentEntity } from './trans-comment.entity';

@Entity({ name: 'transPost' })
export class TransPostEntity extends BaseEntity<ITransPost> implements ITransPost {
  @PrimaryGeneratedColumn({ name: 'postId' })
  postId: number;

  @Column({ name: 'categoryId', type: 'integer', nullable: true })
  categoryId: number;

  @Column({ name: 'title', type: 'nvarchar', length: 255, nullable: true })
  title: string;

  @Column({ name: 'description', type: 'nvarchar', length: 'max', nullable: true })
  description: string;

  @Column({ name: 'cntComment', type: 'integer', nullable: true })
  cntComment: number;

  @Column({ name: 'isDelete', type: 'bit', nullable: true })
  isDelete: boolean;

  @OneToOne(() => MasCategoryEntity, (item) => item.postInfo, OneToOneRelationOptions)
  category: MasCategoryEntity;

  @OneToOne(() => MasUsersEntity, (item) => item.postInfo)
  userInfo: MasUsersEntity;

  @OneToMany(() => TransCommentEntity, (item) => item.postRecord, OneToManyRelationOptions)
  commentList: TransCommentEntity[];

  relationKey(): (keyof ITransPost)[] {
    return ['commentList'];
  }
}
