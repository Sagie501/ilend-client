import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { map } from 'rxjs/operators';
import { getCategoriesQuery } from '../../graphql/category.graphql';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apollo: Apollo) { }

  getCategories(): Observable<Array<Category>> {
    return this.apollo.watchQuery<any>({
      query: getCategoriesQuery
    }).valueChanges.pipe<Array<Category>>(
      map(({ data }) => {
        return data.getCategories as Array<Category>;
      })
    );
  }
}
