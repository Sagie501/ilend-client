import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/error-state-matcher.helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../../core/models/category.model';

@Component({
  selector: 'ile-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.less']
})
export class NewProductDialogComponent implements OnInit, OnDestroy {

  productFormGroup: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    requestedPrice: new FormControl(null, [Validators.required]),
    imageFiles: new FormControl(null, [Validators.required])
  });
  matcher = new MyErrorStateMatcher();
  categories: Array<Category>;
  isLoading: boolean = false;
  subscriptions: Array<Subscription>;
  @ViewChild('image') image;
  @Output() createProductEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { password: string, errorMessage: string },
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
