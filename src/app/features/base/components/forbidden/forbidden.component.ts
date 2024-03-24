import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { RouterModule } from '@angular/router'
import { provideTranslocoScope, TranslocoDirective } from '@ngneat/transloco'

@Component({
  templateUrl: './forbidden.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule, TranslocoDirective],
  providers: [provideTranslocoScope('base')]
})
export class ForbiddenComponent {}
