import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { addProductMutation } from '../../graphql/product.graphql';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { addCommentMutation } from '../../graphql/comment.graphql';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private apollo: Apollo, private userService: UserService) {}

  addComment(
    userId: string,
    productId: string,
    comment: string
  ): Observable<Comment> {
    return this.apollo
      .mutate<any>({
        mutation: addCommentMutation,
        variables: {
          userId,
          productId,
          comment,
        },
      })
      .pipe(
        map(({ data, errors }) => {
          return this.mapCommentForClient(
            data.addComment,
            this.userService.mapUserForClient
          );
        })
      );
  }

  mapCommentForClient(
    serverComment,
    userMappingFunction: (any) => User
  ): Comment {
    let clientComment = {
      ...serverComment,
      date: new Date(serverComment.date),
      productId: serverComment.product.id,
      user: userMappingFunction(serverComment.user),
    };
    delete clientComment.product;
    return clientComment;
  }
}
