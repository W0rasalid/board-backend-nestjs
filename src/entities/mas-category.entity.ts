import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IMasCategory } from './interfaces/mas-categoty.interface';
import { TransPostEntity } from './trans-post.entity';
import { OneToOneRelationOptions } from 'src/common/entities/relation-option';

@Entity({ name: 'masCategory' })
export class MasCategoryEntity extends BaseEntity<IMasCategory> implements IMasCategory {
  @PrimaryGeneratedColumn({ name: 'categoryId' })
  categoryId: number;

  @Column({ name: 'categoryName', type: 'nvarchar', length: 255, nullable: true })
  categoryName: string;

  @Column({ name: 'isActive', type: 'bit', nullable: true })
  isActive: boolean;

  @Column({ name: 'isDelete', type: 'bit', nullable: true })
  isDelete: boolean;

  @OneToOne(() => TransPostEntity, (item) => item.category)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  postInfo: TransPostEntity;

  relationKey(): (keyof IMasCategory)[] {
    return ['postInfo'];
  }
}
