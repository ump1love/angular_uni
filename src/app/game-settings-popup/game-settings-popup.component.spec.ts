import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsPopupComponent } from './game-settings-popup.component';

describe('GameSettingsPopupComponent', () => {
  let component: GameSettingsPopupComponent;
  let fixture: ComponentFixture<GameSettingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSettingsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
