import { ITransPost } from './trans-post.interface';

export interface IMasCategory {
  categoryId?: number;
  categoryName?: string;
  isActive?: boolean;
  isDelete?: boolean;
  createId?: number;
  createName?: string;
  createDate?: Date;
  modifyId?: number;
  modifyName?: string;
  modifyDate?: Date;
  postInfo?: ITransPost;
}
