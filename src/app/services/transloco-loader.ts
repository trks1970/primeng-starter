import { inject, Injectable } from '@angular/core'
import { Translation, TranslocoLoader } from '@ngneat/transloco'
import { HttpClient } from '@angular/common/http'
import { forkJoin, map, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient)

  getTranslation(langPath: string) {
    let [path, activeLang] = langPath.split('/')
    if (!activeLang) activeLang = path
    let translations: Observable<any>[] = []
    translations.push(this.http.get<Translation>(`./assets/i18n/${langPath}.json`))
    translations.push(this.http.get<Translation>(`./assets/i18n/base/${activeLang}.json`))

    return forkJoin([...translations]).pipe(
      map(([translation, vendor]) => {
        return { ...translation, ...vendor }
      })
    )
  }
}
