import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AmountComponent } from './components/amount/amount.component';
import { HeaderComponent } from './components/header/header.component';
import { UserNameCircleComponent } from './components/user-name-circle/user-name-circle.component';
import { ButtonComponent } from './components/button/button.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ImageComponent } from './components/image/image.component';
import { ImagesSliderComponent } from './components/images-slider/images-slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataDiagramComponent } from './components/data-diagram/data-diagram.component';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { LeasingsTableComponent } from './components/leasings-table/leasings-table.component';
import { LeaseProductDisplayComponent } from './components/lease-product-display/lease-product-display.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SuggestedPriceComponent } from './components/suggested-price/suggested-price.component';
import { PriceComponent } from './components/price/price.component';

@NgModule({
  declarations: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    HeaderComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
    ImagesSliderComponent,
    ProductCardComponent,
    DataTableComponent,
    DataDiagramComponent,
    ConfirmationDialogComponent,
    ProductViewComponent,
    LeasingsTableComponent,
    LeaseProductDisplayComponent,
    SuggestedPriceComponent,
    PriceComponent,
  ],
  imports: [
    CommonModule,
    NgImageSliderModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatStepperModule,
    LayoutModule
  ],
  exports: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    HeaderComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
    ImagesSliderComponent,
    ProductCardComponent,
    DataTableComponent,
    DataDiagramComponent,
    ProductViewComponent,
    LeasingsTableComponent,
    LeaseProductDisplayComponent,
    SuggestedPriceComponent,
    PriceComponent,
  ],
})
export class SharedModule {}
