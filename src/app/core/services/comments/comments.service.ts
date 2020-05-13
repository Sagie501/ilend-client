import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  mapCommentForClient(serverComment): Comment {
    let clientComment = {
      ...serverComment,
      date: new Date(serverComment.date),
      userId: serverComment.user.id,
      productId: serverComment.product.id
    };
    delete clientComment.user;
    delete clientComment.product;
    return clientComment;
  }
}
