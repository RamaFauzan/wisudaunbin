import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
  
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
  
    this.initializeApp();
  }

  initializeApp() {
  

    this.storage.get('lock_akses2').then((res)=>{
      if(res == null){
        this.navCtrl.navigateRoot('/splash');
      }else{
        this.navCtrl.navigateRoot('/home/tab1');
      }  
     
    });

    
  }
}
