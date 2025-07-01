import {
  Component, Input, Output, EventEmitter, OnInit, HostListener,
  Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { navbarData } from './nav-data';
import { RouterModule } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth <= 768) {
        this.collapsed = false;
        this.onToggleSideNav.emit({
          collapsed: this.collapsed, screenWidth: this.screenWidth
        });
      }
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed, screenWidth: this.screenWidth
    });
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed, screenWidth: this.screenWidth
    });
  }
}
