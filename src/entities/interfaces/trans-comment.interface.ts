import { IMasUsers } from './mas-user.interface';
import { ITransPost } from './trans-post.interface';

export interface ITransComment {
  commentId?: number;
  postId?: number;
  description?: string;
  isDelete?: boolean;
  createId?: number;
  createName?: string;
  createDate?: Date;
  modifyId?: number;
  modifyName?: string;
  modifyDate?: Date;
  postRecord?: ITransPost;
  userInfo?: IMasUsers;
}

export interface ITransCommentSearchResult extends ITransComment {
  no: number;
  rowCount: number;
  author: string;
  profileImage: string;
}
