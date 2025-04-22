import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameSettingsPopupComponent } from './game-settings-popup/game-settings-popup.component';
import { FormsModule, NgModel } from '@angular/forms';
import { UtilsService } from './utils.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatDialogModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Card Game';

  constructor(private dialog: MatDialog, public utils: UtilsService, public snackBar: MatSnackBar) {}

  cardsAmount: number = 0;
  correctCards: number = 0;
  unigueColors: string[] = [];
  cards: string[] = [];
  currentCard: any[] = [];
  revealed: boolean[] = [];

  ngOnInit() {
    document.body.style.backgroundColor = '#1b1b1b';
    document.body.style.color = '#ffffff';
    document.body.style.fontSize = '16px';
    document.body.style.padding = '20px';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    document.body.style.fontSize = '';
    document.body.style.padding = '';
  }

  revealCard(index: number) {
    if (this.revealed[index] || this.currentCard.includes(index)) {
      return;
    }
  
    this.revealed[index] = true;
    this.currentCard.push(index);
    console.log(this.correctCards);
    if (this.currentCard.length === 2) {
      const [firstIndex, secondIndex] = this.currentCard;
      const firstColor = this.cards[firstIndex];
      const secondColor = this.cards[secondIndex];

      if (firstColor === secondColor) {
        this.correctCards += 2;
        this.revealed[firstIndex] = true;
        this.revealed[secondIndex] = true;
        console.log(this.correctCards);
        if (this.correctCards === this.cardsAmount) {
          alert('You won!');
        }
      } 
      else {
        setTimeout(() => {
          this.revealed[firstIndex] = false;
          this.revealed[secondIndex] = false;
        }, 700);
      }
  
      this.currentCard = [];
    }
  }
  

  openSettingsButton() {

    this.correctCards = 0;

    this.revealed = Array(this.cardsAmount).fill(false);

    const dialogRef = this.dialog.open(GameSettingsPopupComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.snackBar.open('Please select a wanted amount of cards first!', 'OK', {
          duration: 2000,
        });
        return;
      }
      this.cardsAmount = result;
      this.cards = [];
      this.unigueColors = [];
      
      for (let i = 0; i < result/2; i++) {
        this.unigueColors.push(this.utils.getRandomColor());
      }

      for (let color in this.unigueColors) {
        this.cards.push(this.unigueColors[color]);
        this.cards.push(this.unigueColors[color]);
      }

      this.cards = this.utils.shuffleArray(this.cards);

    });
  }

  gameStartButton(): void {
    this.correctCards = 0;

    if (this.cardsAmount === 0) {
      this.snackBar.open('Please select a wanted amount of cards in the settings menu first!', 'OK', {
        duration: 2500,
      });
      return;
    }
    alert('Game started!');

    this.revealed = Array(this.cardsAmount).fill(true);

    this.utils.delay(1000);

    this.revealed = Array(this.cardsAmount).fill(false);

    this.cards = this.utils.shuffleArray(this.cards);

    if (this.cardsAmount === 0) {
      alert('Please select a field size first!');
      return;
    }
    
  }
}