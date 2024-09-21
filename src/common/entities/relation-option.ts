import { RelationOptions } from 'typeorm';

export const OneToOneRelationOptions: RelationOptions = {
  nullable: true,
  cascade: true,
};

export const OneToManyRelationOptions: RelationOptions = {
  nullable: true,
  cascade: true,
};

export const ManyToOneRelationOptions: RelationOptions = {
  createForeignKeyConstraints: false,
  nullable: true,
};

export const ManyToManyRelationOptions: RelationOptions = {
  createForeignKeyConstraints: false,
  nullable: true,
};
