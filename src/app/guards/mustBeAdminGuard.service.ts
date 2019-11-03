import { Injectable } from "@angular/core";  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service'

@Injectable()  
export class MustBeAdminGuardService implements CanActivate  {    
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>|Promise<boolean>|boolean {  
        if (!this.auth.isAdminAuthenticated()) {
            this.router.navigate(['admin/login']);
            return false;
        }
        
        return true;
    }  
}  