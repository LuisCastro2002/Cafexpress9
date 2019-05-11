import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { CrudService } from 'src/app/crud.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

id:string;
compras:any;
val1:number;
val2:number;
val3:number;
val4:number;
val5:number;
val6:number;
rta:number;
Consumidor:string;
Salon:number;
Edificio:number;
Dinero:number;
especificacion:string;
userid:any;
crearcompra(){
}
  OnLogOut(){
this.authservice.logout();
  }
  constructor(private AFauth: AngularFireAuth, public authservice: AuthService, public router:Router, public alertController:AlertController, private crudservice:CrudService, private menuCtrl:MenuController ) { }

  ngOnInit() {
  this.crudservice.read_Menu().subscribe(data => {
 
      this.compras = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userid:e.payload.doc.data()['userid'], //leemos el userid
          Nombre: e.payload.doc.data()['Consumidor'],
          Dinero: e.payload.doc.data()['Dinero'],
          Edificio: e.payload.doc.data()['Edificio'],
          Salon: e.payload.doc.data()['Salon'],
          Brownies: e.payload.doc.data()['Brownies'],
          Tostitos: e.payload.doc.data()['Tostitos'],
          Mazapan: e.payload.doc.data()['Mazapan'],
          Oreo: e.payload.doc.data()['Oreo'],
          Donas: e.payload.doc.data()['Donas'],
          Emperador: e.payload.doc.data()['Emperador'],
          PrecioFinal: e.payload.doc.data()['Preciofinal'],
          especificacion: e.payload.doc.data()['Especificacion']

        };
      })
      console.log(this.compras);
 
    });
   
  }
  
  registrarcompra(){
    let compra = {};
    compra ['userid']= this.AFauth.auth.currentUser.uid; //metemos el userid del usuario logueado
    compra['Consumidor'] = this.Consumidor;
    compra['Dinero'] = this.Dinero;
    compra['Edificio'] = this.Edificio;
    compra ['Salon'] = this.Salon;
    compra ['Brownies']=this.val1;
    compra ['Tostitos']=this.val2;
    compra ['Mazapan']=this.val3;
    compra ['Oreo']=this.val4;
    compra ['Donas']=this.val5;
    compra ['Emperador']=this.val6;
    compra ['Preciofinal']=this.rta;
    compra ['Especificación']=this.especificacion
    this.crudservice.create_NuevoMenu(compra).then(resp => {
      this.Consumidor= "";
      this.Dinero = undefined;
      this.Edificio= undefined;
      this.Salon=undefined;
      this.val1=undefined;
      this.val2=undefined;
      this.val3=undefined;
      this.val4=undefined;
      this.val5=undefined;
      this.val6=undefined;
      this.especificacion="";
      this.rta=undefined
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  
  
  preciofinal(val1,val2,val3,val4,val5,val6){ 
    if(val1===undefined){

      this.val1=0
  
    } if (val2===undefined){
      this.val2=0
    } if (val3===undefined){
      this.val3=0
    } if (val4===undefined){
      this.val4=0
    } if (val5===undefined){
      this.val5=0 
    } if (val6===undefined){
      this.val6=0
    }
    this.rta=(this.val1*10)+(15*this.val2)+(this.val3*5)+(this.val4*18)+(this.val5*13)+(this.val6*15);
    console.log(this.rta)
return this.rta;
  }

  RemoveCompra(rowID) {
    this.crudservice.delete_menu(rowID);
  }
  
  openMenu(){
    this.menuCtrl.toggle()
  }
  
  
}
