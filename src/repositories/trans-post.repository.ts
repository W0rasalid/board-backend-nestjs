import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqSearchPostDto } from 'src/business/board/dto/request';
import { PageResult } from 'src/common/dto/resp-common.dto';
import { ITransPostSearchResult } from 'src/entities/interfaces/trans-post.interface';
import { TransPostEntity } from 'src/entities/trans-post.entity';
import { EntityManager, ILike, Repository } from 'typeorm';

@Injectable()
export class TransPostRepository {
  constructor(
    @InjectRepository(TransPostEntity)
    private repository: Repository<TransPostEntity>,
  ) {}

  async findAll(): Promise<TransPostEntity[]> {
    return await this.repository.find({ where: { isDelete: false } });
  }

  async findBySearch(params: ReqSearchPostDto) {
    const query = this.repository
      .createQueryBuilder('post')
      .select(`CAST(ROW_NUMBER () OVER (ORDER BY post.createDate DESC) AS INT) AS no`)
      .addSelect('CAST(COUNT(1) OVER () AS INT)', 'rowCount')
      .addSelect([
        'post.*',
        'category.categoryName',
        `user.firstName + ' ' + user.lastName as author`,
        'user.profileImage',
      ])
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.userInfo', 'user')
      .where('post.isDelete = :isDelete', { isDelete: false });

    if (params?.keyword) {
      query.andWhere(
        `(post.title LIKE '%${params.keyword}%' OR post.description LIKE '%${params.keyword}%')`,
      );
    }
    const skip = (params?.pageCurrent ?? 0) * (params?.pageSize ?? 10);
    query.take(params?.pageSize ?? 10);
    query.skip(skip);

    const data = await query.getRawMany<ITransPostSearchResult>();
    console.log(data);
    const rowCount = data[0]?.rowCount ?? 0;
    const result: PageResult<ITransPostSearchResult> = {
      currentPage: Number(params.pageCurrent),
      pageCount: Math.ceil(rowCount / (params?.pageSize ?? 10)),
      pageSize: Number(params?.pageSize),
      rowCount: rowCount,
      data: data,
    };

    return result;
  }

  async findOneById(postId: number): Promise<TransPostEntity> {
    const result = await this.repository.findOneBy({ postId, isDelete: false });
    return result;
  }

  async saveData(data: TransPostEntity, trans?: EntityManager | null): Promise<TransPostEntity> {
    if (trans) {
      return await trans.save(data);
    } else {
      return await this.repository.save(data);
    }
  }
}
