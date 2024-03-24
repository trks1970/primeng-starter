import { Component } from '@angular/core'
import { LayoutService } from '../service/app.layout.service'
import { NgOptimizedImage } from '@angular/common'
import { environment } from '../../../environments/environment'
import { TranslocoDirective } from '@ngneat/transloco'

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoDirective]
})
export class AppFooterComponent {
  constructor(private layoutService: LayoutService) {}

  get isDarkMode(): boolean {
    return this.layoutService.config().theme.includes('dark')
  }

  protected readonly environment = environment
}
