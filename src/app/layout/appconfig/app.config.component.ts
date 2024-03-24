import { Component } from '@angular/core'
import { LayoutService } from '../service/app.layout.service'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-config',
  templateUrl: './app.config.component.html',
  standalone: true,
  imports: [NgIf]
})
export class AppConfigComponent {
  constructor(private layoutService: LayoutService) {
    this.changeTheme('lara-light-blue', 'light')
  }

  get isDarkMode(): boolean {
    return this.layoutService.config().theme.includes('dark')
  }

  toggleDarkMode() {
    if (this.isDarkMode) {
      this.changeTheme('lara-light-blue', 'light')
    } else {
      this.changeTheme('lara-dark-blue', 'dark')
    }
  }

  private changeTheme(themeName: string, colorScheme: string): void {
    this.layoutService.config.update((config) => ({
      ...config,
      theme: themeName,
      colorScheme: colorScheme
    }))
  }
}
