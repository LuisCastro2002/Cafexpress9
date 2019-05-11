import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service'
import {Router} from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 public email:string="";
 public password:string="";
public cpassword:string="";

  constructor(private auth: AuthService, private router:Router, public afAuth:AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {
  }
async OnSubmitRegister(){
const {email, password,cpassword}=this

if (password !== cpassword){
  return this.presentAlertPassword("Bad","Las contraseñas utilizadas no coinciden");
}

try {
  const res= await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
  this.presentAlertSave("Éxito", "Los datos se han guardado correctamente")
} catch (error) {
  console.dir(error)
 }



}

async presentAlertPassword(header, message){
  const alert=await this.alertController.create({
    header: header,
    message: message,
    buttons: [{
      text:'OK',
      handler:() => {
        this.router.navigate(['/register']);
      }
    }]
  });
  await alert.present();
}

async presentAlertSave(header, message){
  const alert=await this.alertController.create({
    header:header,
    message:message,
    buttons: [{
      text:'OK',
      handler:() => {
        this.router.navigate(['/menu']);
      }
    }

    ]
  });
  await alert.present();
}
 }

