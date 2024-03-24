import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { PanelMenuModule } from 'primeng/panelmenu'
import { TranslocoService } from '@ngneat/transloco'
import { filter, first, map } from 'rxjs'
import { BaseMenu } from '../../features/base/base.menu'
import { MappingMenu } from '../../features/mapping/mapping.menu'
import { NgIf } from '@angular/common'

const DEFAULT_SCOPE = 'default_scope'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  imports: [PanelMenuModule, NgIf],
  standalone: true
})
export class AppMenuComponent implements OnInit {
  visible: boolean = true
  items: MenuItem[] = []

  private loadMap: Map<string, Map<string, boolean>> = new Map()

  constructor(private translocoService: TranslocoService) {
    this.translationLoaded('en', null)
    // see: https://github.com/jsverse/transloco/issues/461#issuecomment-877168674
    this.translocoService.events$
      .pipe(
        filter((e) => e.type === 'langChanged'),
        map((x) => x.payload)
      )
      .subscribe(({ langName, scope }) => {
        if (this.isTranslationLoaded(langName, scope)) {
          this.translateMenu(this.items)
          this.items = [...this.items]
        }
        this.translocoService.events$
          .pipe(
            filter((e) => e.type === 'translationLoadSuccess'),
            map((x) => x.payload),
            first()
          )
          .subscribe(({ langName, scope }) => {
            this.translationLoaded(langName, scope)
            this.translateMenu(this.items)
            this.items = [...this.items]
          })
      })
  }

  ngOnInit() {
    this.items = [BaseMenu, MappingMenu]
    this.translateMenu(this.items)
  }

  private isTranslationLoaded(langName: string, scope?: string | null): boolean {
    let result = false
    let scopeMap: Map<string, boolean> | undefined = this.loadMap.get(langName)
    if (scopeMap) {
      if (scope) result = scopeMap.get(scope)!
      else result = scopeMap.get(DEFAULT_SCOPE)!
    }
    return result
  }

  private translationLoaded(langName: string, scope?: string | null): void {
    let scopeMap: Map<string, boolean> | undefined = this.loadMap.get(langName)
    if (!scopeMap) {
      scopeMap = new Map()
      this.loadMap.set(langName, scopeMap)
    }
    if (scope) {
      scopeMap.set(scope, true)
    } else {
      scopeMap.set(DEFAULT_SCOPE, true)
    }
  }

  translateMenu(items: MenuItem[]) {
    for (let item of items) {
      if (item.separator) continue
      item.label = this.translocoService.translate(item.id!)
      if (item.items) {
        this.translateMenu(item.items)
      }
    }
    this.visible = false
    setTimeout(() => (this.visible = true), 0)
  }
}
