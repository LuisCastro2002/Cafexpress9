import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import {AngularFireAuth} from '@angular/fire/auth'
import {map} from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private AFauth:AngularFireAuth, private router:Router){}
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(
    next: ActivatedRouteSnapshot, 
     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>  |  boolean {
      return this.AFauth.authState.pipe(map(auth=>{

        if(isNullOrUndefined(auth)){
          return true;
        }else {
          this.router.navigate(['/menu']);
          return false;
        }
        
        //console.log(auth); 
        //return false;
        } ))
        
}
}
