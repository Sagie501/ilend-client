import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AmountComponent } from './components/amount/amount.component';

@NgModule({
  declarations: [SearchComponent, CheckboxComponent, AmountComponent],
  imports: [CommonModule],
  exports: [SearchComponent, CheckboxComponent, AmountComponent],
})
export class SharedModule {}
