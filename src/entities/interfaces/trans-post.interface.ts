import { ITransComment } from './trans-comment.interface';

export interface ITransPost {
  postId?: number;
  categoryId?: number;
  title?: string;
  description?: string;
  cntComment?: number;
  isDelete?: boolean;
  createId?: number;
  createName?: string;
  createDate?: Date;
  modifyId?: number;
  modifyName?: string;
  modifyDate?: Date;
  commentList?: ITransComment[];
}

export interface ITransPostSearchResult {
  no?: number;
  rowCount?: number;
  categoryName?: string;
  author?: string;
  profileImage?: string;
}
