import {Component, OnInit} from '@angular/core';
import {LAYOUT_MODE} from '../../layouts/layouts.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../core/services/storage.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss']
})

/**
 * Page-500 Component
 */
export class Page500Component implements OnInit {

  layout_mode!: string
  public message = 'There was a problem processing your request';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute('data-layout-mode', 'dark');
    }
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(params => {
        if (params.value) {
          this.message = params.value;
        }
      });
  }

  logout(): void {
    this.storageService.logout();
  }

  updatePage(): void {
    this.router.navigate(['/']);
  }
}
