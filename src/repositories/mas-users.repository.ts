import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasUsersEntity } from 'src/entities/mas-users.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MasUsersRepository {
  constructor(
    @InjectRepository(MasUsersEntity)
    private repository: Repository<MasUsersEntity>,
  ) {}

  async findAll(): Promise<MasUsersEntity[]> {
    const result = await this.repository.find({ where: { isDelete: false } });
    return result;
  }

  async findOneById(userId: number): Promise<MasUsersEntity> {
    const result = await this.repository.findOneBy({ userId, isDelete: false });
    return result;
  }

  async findOneByEmail(email: string): Promise<MasUsersEntity> {
    const result = await this.repository.findOneBy({ email, isDelete: false });
    return result;
  }

  async findOneByUserName(userName: string): Promise<MasUsersEntity> {
    const result = await this.repository.findOneBy({ userName, isDelete: false });
    return result;
  }

  async saveData(data: MasUsersEntity, trans?: EntityManager | null): Promise<MasUsersEntity> {
    if (trans) {
      return await trans.save(data);
    } else {
      return await this.repository.save(data);
    }
  }
}
