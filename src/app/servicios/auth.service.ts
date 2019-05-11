import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {promise} from 'protractor'
import {Router} from '@angular/router'
import { reject } from 'q';
import {AngularFirestore} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
id:string;
user:any;
  constructor(private AFauth: AngularFireAuth, private router:Router, private db:AngularFirestore) { }


  login(email:string, password:string){
    return new Promise((resolve, rejected)=> {
      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user=>{
        resolve(user);
        //this.id =  this.AFauth.auth.currentUser.uid;
        //console.log(this.id)
        //this.router.navigate(['/menu', this.id])
      }).catch(err=> rejected(err));
    });

  }

logout(){
  this.AFauth.auth.signOut().then(auth=> {
    this.router.navigate(['/login']);
  })
}

isLogin(){
 
}

register(email:string, password:string){
  return new Promise ((resolve,reject)=> {
    this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
console.log(res.user.uid)

resolve(res)
    }).catch(err=> reject(err))
  })
}

}
