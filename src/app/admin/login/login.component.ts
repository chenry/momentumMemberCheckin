import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { AdminService } from '../../admin.service';
import {Router} from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class AdminLoginComponent implements OnInit, OnDestroy {
  password = new FormControl('');

  subscriptions = [];

  constructor(public adminService: AdminService, public router: Router, private auth: AuthService) {}

  ngOnInit() {

  }

  public submitAdminPassword() {

    const adminAuthReq = {
      password: this.password.value
    }

    console.log({adminAuthReq});

    this.subscriptions.push(
      this.adminService.authenticateAdmin(adminAuthReq)
        .subscribe(isValid => {

          if (isValid) {
            this.auth.setAdminAuthenticated();
            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('/');
          }
          return;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
