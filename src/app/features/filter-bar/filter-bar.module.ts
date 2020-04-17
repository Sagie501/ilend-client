import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilterBarComponent } from './containers/filter-bar/filter-bar.component';
import { FilterService } from './services/filter/filter.service';
import { StoreModule } from '@ngrx/store';
import { filteringReducer, filteringToken } from './reducers/filter.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularHistogramSliderModule } from 'angular-histogram-slider';
import { DropdownFilterOverlayComponent } from './components/dropdown-filter-overlay/dropdown-filter-overlay.component';
import { RowFilterComponent } from './components/row-filter/row-filter.component';
import { PriceFilterOverlayComponent } from './components/price-filter-overlay/price-filter-overlay.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';

@NgModule({
  declarations: [
    FilterBarComponent,
    DropdownFilterComponent,
    DropdownFilterOverlayComponent,
    RowFilterComponent,
    PriceFilterOverlayComponent,
    PriceFilterComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    StoreModule.forFeature(filteringToken, filteringReducer),
    SharedModule,
    AngularHistogramSliderModule
  ],
  providers: [FilterService],
  exports: [FilterBarComponent]
})
export class FilterBarModule {
}
