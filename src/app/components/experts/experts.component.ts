import { Router } from '@angular/router';
import { ExpertService } from './../../shared/services/expert/expert.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Expert } from './../../shared/models/expert.model';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  experts: Observable<Expert[]>;

  constructor(private router: Router, private expertService: ExpertService) {}

  ngOnInit(): void {
    this.experts = this.expertService.get();
  }

  showExpertDetails(id): void {
    this.router.navigateByUrl(`/experts/${id}`);
  }
}
