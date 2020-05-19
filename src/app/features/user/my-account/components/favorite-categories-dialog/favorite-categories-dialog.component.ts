import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/error-state-matcher.helper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { Category } from '../../../../../core/models/category.model';

@Component({
  selector: 'ile-favorite-categories-dialog',
  templateUrl: './favorite-categories-dialog.component.html',
  styleUrls: ['./favorite-categories-dialog.component.less']
})
export class FavoriteCategoriesDialogComponent implements OnInit {

  favoriteCategoriesFormControl: FormControl = new FormControl([]);
  matcher = new MyErrorStateMatcher();
  categories: Array<Category> = [];
  @Output() changeUserEvent: EventEmitter<Array<Category>> = new EventEmitter<Array<Category>>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { favoriteCategories: Array<Category>, errorMessage: string },
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.data.favoriteCategories.forEach((favoriteCategory) => {
        let categoryIndex = this.categories.findIndex((category) => category.id === favoriteCategory.id);
        if (categoryIndex !== -1) {
          this.favoriteCategoriesFormControl.value.push(this.categories[categoryIndex]);
        }
      });
      this.favoriteCategoriesFormControl.updateValueAndValidity();
    });
  }
}
