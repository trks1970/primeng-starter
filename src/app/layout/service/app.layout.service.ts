import { Injectable, effect, signal } from '@angular/core'
import { Subject } from 'rxjs'

export interface AppConfig {
  inputStyle: string
  colorScheme: string
  theme: string
  ripple: boolean
  menuMode: string
  scale: number
}

interface LayoutState {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  _config: AppConfig = {
    ripple: true,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14
  }

  config = signal<AppConfig>(this._config)

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  }

  private readonly configUpdate = new Subject<AppConfig>()

  private readonly overlayOpen = new Subject<any>()

  configUpdate$ = this.configUpdate.asObservable()

  overlayOpen$ = this.overlayOpen.asObservable()

  constructor() {
    effect(() => {
      const config = this.config()
      if (this.updateStyle(config)) {
        this.changeTheme()
      }
      this.changeScale(config.scale)
      this.onConfigUpdate()
    })
  }

  updateStyle(config: AppConfig) {
    return config.theme !== this._config.theme || config.colorScheme !== this._config.colorScheme
  }

  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null)
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null)
      }
    }
  }

  showProfileSidebar() {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null)
    }
  }

  showConfigSidebar() {
    this.state.configSidebarVisible = true
  }

  isOverlay() {
    return this.config().menuMode === 'overlay'
  }

  isDesktop() {
    return window.innerWidth > 991
  }

  isMobile() {
    return !this.isDesktop()
  }

  onConfigUpdate() {
    this._config = { ...this.config() }
    this.configUpdate.next(this.config())
  }

  changeTheme() {
    const config = this.config()
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement
    const themeLinkHref = themeLink.getAttribute('href')!
    const newHref = themeLinkHref
      .split('/')
      .map((_el) => (_el == this._config.theme ? (_el = config.theme) : _el == `theme-${this._config.colorScheme}` ? (_el = `theme-${config.colorScheme}`) : _el))
      .join('/')

    this.replaceThemeLink(newHref)
  }

  replaceThemeLink(href: string) {
    const id = 'theme-css'
    const themeLink = document.getElementById(id) as HTMLLinkElement
    const cloneLinkElement = themeLink.cloneNode(true) as HTMLLinkElement

    cloneLinkElement.setAttribute('href', href)
    cloneLinkElement.setAttribute('id', id + '-clone')

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling)
    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove()
      cloneLinkElement.setAttribute('id', id)
    })
  }

  changeScale(value: number) {
    document.documentElement.style.fontSize = `${value}px`
  }
}
