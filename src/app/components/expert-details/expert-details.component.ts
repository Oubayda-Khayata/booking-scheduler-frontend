import { ExpertService } from './../../shared/services/expert/expert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Expert } from './../../shared/models/expert';

@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.scss']
})
export class ExpertDetailsComponent implements OnInit {

  @Input() expert: Expert;
  get imageUrl(): string {
    return this.expert ? `./assets/images/${this.expert.gender}.png` : '';
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expertService: ExpertService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.expertService.getExpert(id).subscribe(expert => this.expert = expert);
    })
  }

  bookNow(): void {
    if (this.expert) {
      this.router.navigateByUrl(`/appointment/${this.expert.id}`);
    }
  }

}
