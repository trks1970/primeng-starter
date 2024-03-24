import { Component } from '@angular/core'
import { TranslocoDirective } from '@ngneat/transloco'
import { environment } from '../../../../../environments/environment'
import { LayoutService } from '../../../../layout/service/app.layout.service'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [TranslocoDirective, NgOptimizedImage],
  standalone: true
})
export class HomeComponent {
  protected readonly environment = environment
  constructor(private layoutService: LayoutService) {}

  get isDarkMode(): boolean {
    return this.layoutService.config().theme.includes('dark')
  }
}
