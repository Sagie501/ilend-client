import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/error-state-matcher.helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../../core/models/category.model';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'ile-new-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.less']
})
export class ProductDialogComponent implements OnInit, OnDestroy {

  productFormGroup: FormGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    name: new FormControl(this.data?.name, [Validators.required]),
    description: new FormControl(this.data?.description, [Validators.required]),
    requestedPrice: new FormControl(this.data?.requestedPrice, [Validators.required]),
    imageFiles: new FormControl(this.data?.imageFiles, [Validators.required])
  });
  matcher = new MyErrorStateMatcher();
  categories: Array<Category>;
  isLoading: boolean = false;
  subscriptions: Array<Subscription>;
  @ViewChild('image') image;
  @Input() isCreatingMode: boolean;
  @Output() saveProductEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                name: string,
                description: string,
                requestedPrice: number,
                category: Category,
                errorMessage: string,
                imageFiles: FileInput
              },
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
        if (this.data) {
          let categoryIndex = this.categories.findIndex((category) => category.id === this.data.category.id);
          this.productFormGroup.get('category').patchValue(this.categories[categoryIndex]);
        }
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
