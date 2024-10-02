import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqSearchCommentDto } from 'src/business/comment/dto/request';
import { PageResult } from 'src/common/dto/resp-common.dto';
import { ITransCommentSearchResult } from 'src/entities/interfaces/trans-comment.interface';
import { TransCommentEntity } from 'src/entities/trans-comment.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TransCommentRepository {
  constructor(
    @InjectRepository(TransCommentEntity)
    private repository: Repository<TransCommentEntity>,
  ) {}

  async findAll(): Promise<TransCommentEntity[]> {
    return await this.repository.find({ where: { isDelete: false } });
  }

  async findByPostId(params: ReqSearchCommentDto) {
    const query = this.repository
      .createQueryBuilder('c')
      .select(`CAST(ROW_NUMBER () OVER (ORDER BY c.createDate DESC) AS INT) AS no`)
      .addSelect('CAST(COUNT(1) OVER () AS INT)', 'rowCount')
      .addSelect(['c.*', `user.firstName + ' ' + user.lastName as author`, 'user.profileImage'])
      .leftJoinAndSelect('c.userInfo', 'user')
      .where('c.isDelete = :isDelete', { isDelete: false })
      .andWhere('c.postId = :postId', { postId: params.postId });

    const skip = (params?.pageCurrent ?? 0) * (params?.pageSize ?? 10);
    query.take(params?.pageSize ?? 10);
    query.skip(skip);

    const data = await query.getRawMany<ITransCommentSearchResult>();

    const rowCount = data[0]?.rowCount ?? 0;
    const result: PageResult<ITransCommentSearchResult> = {
      currentPage: Number(params.pageCurrent),
      pageCount: Math.ceil(rowCount / (params?.pageSize ?? 10)),
      pageSize: Number(params?.pageSize),
      rowCount: rowCount,
      data: data,
    };

    return result;
  }

  async findOneById(commentId: number): Promise<TransCommentEntity> {
    const result = await this.repository.findOneBy({ commentId, isDelete: false });
    return result;
  }

  async saveData(
    data: TransCommentEntity,
    trans?: EntityManager | null,
  ): Promise<TransCommentEntity> {
    if (trans) {
      return await trans.save(data);
    } else {
      return await this.repository.save(data);
    }
  }
}
