import { JwtPayloadExtension } from './../../helpers/jwt-payload-extension';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

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
  userHasElevated = false;

  constructor(private mediaObserver: MediaObserver,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private authService: AuthService,
              private snackbar: MatSnackBar) {
    this.matIconRegistry.addSvgIcon(
      'atom',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/atom.svg')
    );
    if (this.authService.isLoggedIn()) {
      this.userHasElevated = this.authService.hasElevated();
    }
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

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.snackbar.open('Te-ai deconectat cu succes',
      'Inchide', { duration: 3000 });
  }

  ngOnDestroy(): void {
    this.mcSub.unsubscribe();
  }

  ngOnInit(): void {

  }

  routeTo(href: string): void {

  }

}
