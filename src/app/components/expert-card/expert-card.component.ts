import { Expert } from './../../shared/models/expert';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expert-card',
  templateUrl: './expert-card.component.html',
  styleUrls: ['./expert-card.component.scss']
})
export class ExpertCardComponent implements OnInit {

  @Input() expert: Expert;
  @Output() showDetailsClick : EventEmitter<number> = new EventEmitter<number>();
  get imageUrl(): string {
    return this.expert ? `./assets/images/${this.expert.gender}.png` : '';
  }
  constructor() { }

  ngOnInit(): void {
  }

  showDetails(): void {
    if (this.expert) {
      this.showDetailsClick.emit(this.expert.id);
    }
  }

}
