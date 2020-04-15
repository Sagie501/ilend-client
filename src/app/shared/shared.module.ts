import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AmountComponent } from './components/amount/amount.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    HeaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
