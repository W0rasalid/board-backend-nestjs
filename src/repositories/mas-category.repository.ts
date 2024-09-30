import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasCategoryEntity } from 'src/entities/mas-category.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MasCategoryRepository {
  constructor(
    @InjectRepository(MasCategoryEntity)
    private repository: Repository<MasCategoryEntity>,
  ) {}

  async findAll(): Promise<MasCategoryEntity[]> {
    return await this.repository.find({ where: { isDelete: false } });
  }

  async findAllActive(): Promise<MasCategoryEntity[]> {
    return await this.repository.find({ where: { isActive: true, isDelete: false } });
  }

  async findOneById(categoryId: number): Promise<MasCategoryEntity> {
    return await this.repository.findOneBy({ categoryId, isDelete: false });
  }

  async saveData(
    data: MasCategoryEntity,
    trans?: EntityManager | null,
  ): Promise<MasCategoryEntity> {
    if (trans) {
      return await trans.save(data);
    } else {
      return await this.repository.save(data);
    }
  }
}
