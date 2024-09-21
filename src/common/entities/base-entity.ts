import { Column } from 'typeorm';

export abstract class BaseEntity<T> {
  @Column({ name: 'createId', type: 'int', nullable: true })
  createId: number;

  @Column({ name: 'createName', type: 'nvarchar', length: 255, nullable: true })
  createName: string;

  @Column({ name: 'createDate', type: 'datetime', nullable: true })
  createDate: Date;

  @Column({ name: 'modifyId', type: 'int', nullable: true })
  modifyId: number;

  @Column({ name: 'modifyName', type: 'nvarchar', length: 255, nullable: true })
  modifyName: string;

  @Column({ name: 'modifyDate', type: 'datetime', nullable: true })
  modifyDate: Date;

  abstract relationKey(): (keyof T)[];
}
