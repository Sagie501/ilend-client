import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/error-state-matcher.helper';

@Component({
  selector: 'ile-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.less']
})
export class EmailDialogComponent implements OnInit {

  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  @Output() changeEmailEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string, errorMessage: string }) {
  }

  ngOnInit(): void {
  }
}
