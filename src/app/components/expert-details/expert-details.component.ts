import { TimezoneService } from './../../core/services/timezone/timezone.service';
import { ExpertService } from './../../shared/services/expert/expert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Expert } from './../../shared/models/expert.model';

@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.scss'],
})
export class ExpertDetailsComponent implements OnInit {
  expert: Expert;
  get imageUrl(): string {
    return this.expert ? `./assets/images/${this.expert.gender}.png` : '';
  }
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expertService: ExpertService,
    private timezoneService: TimezoneService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      this.getExpert();
    });
    this.timezoneService.currentTimezoneState.subscribe((timezone: string) => this.getExpert());
  }

  getExpert(): void {
    this.expertService
      .getExpert(this.id, this.timezoneService.currentTimezone)
      .subscribe((expert: Expert) => this.expert = expert);
  }

  bookNow(): void {
    if (this.expert) {
      this.router.navigateByUrl(`/appointment/${this.expert.id}`);
    }
  }
}
