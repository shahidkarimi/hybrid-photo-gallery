import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { globalAppService } from '../globals';
import { TabsPage } from '../tabs/tabs';


import 'rxjs/Rx';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {
  	email: '',
  	password: ''
  };
  constructor(public navCtrl: NavController,public http: Http,public appglobals:globalAppService) {

  }

  loginNow(){
  	    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  	   this.http.post(this.appglobals.endpints.login, this.registerCredentials, {
      headers: headers
    })
        .subscribe(
            data => {
             var d = data.json();
             if(d.status==1){
               localStorage.setItem('skey',d.access_token);
               this.appglobals.secret_key = d.access_token;
               this.navCtrl.setRoot(TabsPage);
             
             }
        },
        () => console.log('Authentication Complete')
    );
  }

}
