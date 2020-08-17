import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ile-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.less'],
})
export class ProfilePictureDialogComponent implements OnInit {
  @Output() changeUserEvent: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  profilePictureGroup = new FormGroup({
    profilePicture: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { errorMessage: string }
  ) {}

  ngOnInit(): void {}

  changeProfilePicture() {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let profilePicture = e.target.result.split(',')[1];
        this.changeUserEvent.emit(profilePicture);
      };
      reader.readAsDataURL(
        this.profilePictureGroup.value.profilePicture._files[0]
      );
    });
  }
}
