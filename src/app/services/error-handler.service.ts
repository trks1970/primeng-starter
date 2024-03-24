import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { TranslocoService } from '@ngneat/transloco'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private translocoService: TranslocoService,
    private messageService: MessageService
  ) {}

  handleError(response: HttpErrorResponse) {
    switch (response.status) {
      case 404:
        this.createMessage('warn', response.status, response.error.message)
        break

      case 400:
      case 409:
        this.createMessage('error', response.status, response.error.message)
        break

      default:
        this.createMessage('warn', response.status, 'Server error')
    }
  }

  private createMessage(severity: string, code: number, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: this.translocoService.translate('error.' + code),
      detail: detail,
      sticky: severity == 'error'
    })
  }
}
