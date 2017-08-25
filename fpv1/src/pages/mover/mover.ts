import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { Http, Headers,RequestOptions, Request, RequestMethod} from '@angular/http';
import { globalAppService } from '../globals';
/*
  Generated class for the Mover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mover',
  templateUrl: 'mover.html'
})
export class MoverPage {
  public current_dir:Number = 0;
  public curerent_item:any;
  public current_index:Number=0;
  constructor(public http: Http,public appglobals:globalAppService,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
     this.loadFolders(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoverPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  items = [
    {
    	id: '1',
    	file_name: 'Kadal Folder'
    }
  ];


  itemSelected(item) {
   // this.current_dir = item.id;
   if(item.no_f  != '0'){
     if(item.file_name =='Back'){
       this.loadFolders(this.curerent_item.id,1);
     }
     else{
       this.curerent_item = item;
       this.loadFolders(item.id);
     }
    }

    if(item.file_name !='Back'){
      //this.curerent_item = item;
      console.log(this.curerent_item)
    }
  }

  loadFolders(parent_id,back=0){
    this.current_index = parent_id;
    let headers = new Headers();
    headers.append('Authorization','Bearer '+this.appglobals.secret_key);

    this.http.post(this.appglobals.endpints.folderList+"&back="+back+"&parent_id="+parent_id,{},{headers:headers}).map(res => {
      this.items = res.json();
      this.items.push({id:parent_id,file_name:'Back'});
      this.items.reverse();
    }).subscribe(data => {
 
    });
 
  }

  loadBack(parent_id){
     let headers = new Headers();
    headers.append('Authorization','Bearer '+this.appglobals.secret_key);

    this.http.post(this.appglobals.endpints.folderListBack+"&parent_id="+parent_id,{},{headers:headers}).map(res => {
      this.items = res.json();
      this.items.push({id:parent_id,file_name:'Back'});
      this.items.reverse();
    }).subscribe(data => {
 
    });
  }
}
