import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { firestore } from 'firebase';
import { FirebaseAppConfig } from '@angular/fire';
import { AuthService } from './servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
user:any;
  constructor(private firestore: AngularFirestore, private afauth:AngularFireAuth ) { }
create_NuevoMenu(compra){

  return this.firestore.collection('Menu').add(compra)
}


read_Menu(){
this.user= this.afauth.auth.currentUser.uid
console.log(this.user+"-------")
  return this.firestore.collection('Menu',ref => ref.where("userid","==",this.user)).snapshotChanges()
}
//cambiamos
update_Menu(preciofinal){
this.firestore.doc('Menu'+ preciofinal).update(preciofinal)

}
//eliminamos
delete_menu(id){
  console.log(id)
  this.firestore.doc('Menu/'+id).delete();
}
read_User(){
  //return this.firebase.firestore('')
}



}
