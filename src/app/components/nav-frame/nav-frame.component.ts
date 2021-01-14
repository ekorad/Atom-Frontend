import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-nav-frame',
  templateUrl: './nav-frame.component.html',
  styleUrls: ['./nav-frame.component.css']
})
export class NavFrameComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly links = [
    { caption: 'Acasa', href: '' },
    { caption: 'Promotii', href: '' },
    { caption: 'Produse', href: '' },
    { caption: 'Contact', href: '' },
  ];
  @ViewChild(MatSidenav) matSidenav!: MatSidenav;
  mcSub!: Subscription;
  commonSearchString = '';

  constructor(private mediaObserver: MediaObserver,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'atom',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/atom.svg')
    );
  }

  ngAfterViewInit(): void {
    // close side menu at breakpoint
    this.mcSub = this.mediaObserver.asObservable()
      .pipe(
        distinctUntilChanged((prev, crt) => prev[0].mqAlias
          === crt[0].mqAlias)
      )
      .subscribe(changes => {
        if (changes[0].mqAlias === 'md' || changes[0].mqAlias === 'lg'
          || changes[0].mqAlias === 'xl') {
          if (this.matSidenav.opened) {
            this.matSidenav.close();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.mcSub.unsubscribe();
  }

  ngOnInit(): void {

  }

  routeTo(href: string): void {

  }

}
