import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-settings-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game-settings-popup.component.html',
  styleUrls: ['./game-settings-popup.component.css']
})
export class GameSettingsPopupComponent {
  cardsAmount: number = 2;

  isSliderFocused: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<GameSettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {}

  closeGameSettings() {
    this.dialogRef.close(this.cardsAmount);
  }

  amountRangeFocus() {
    this.isSliderFocused = true;
  }

  amountRangeBlur() {
    this.isSliderFocused = false;

    if (this.cardsAmount % 2 !== 0) {
      this.snackBar.open('Please select an even number of cards!', 'OK', {
        duration: 2000,
      });
      this.cardsAmount--
    }
  }
}
