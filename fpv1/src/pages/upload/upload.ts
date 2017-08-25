import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,LoadingController,ToastController} from 'ionic-angular';
import { Http, Headers,RequestOptions, Request, RequestMethod} from '@angular/http';
import {Camera} from 'ionic-native';
import { globalAppService } from '../globals';
import { HomePage } from '../home/home';

import {Observable} from 'rxjs/Observable';


import 'rxjs/Rx';
declare var $: any;
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  public base64Image: string;
  public file_data:string;
  public theResponse:string;
  loading: boolean;
  loader:any = null;
  constructor(public navCtrl: NavController,public http: Http,public appglobals:globalAppService,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }
  
   public ngOnInit(): void {
  
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }
  showLoader() {
    this.loader.present();
  }

  hideLoader(){
    this.loader.dismiss();
  }

  fileChange(event){
     let fileList: FileList = event.target.files;

     this.postWithFile(this.appglobals.endpints.uploadMedia,{secret_key:this.appglobals.secret_key,folder_id:this.appglobals.current_directory},event.target.files);
  }


  uploadData() { 
    this.showLoader();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let reqData = JSON.stringify({ file_data_binary: this.file_data,secret_key:this.appglobals.secret_key,folder_id:this.appglobals.current_directory});

    this.http.post(this.appglobals.endpints.fileUpload, reqData, {
      headers: headers
    })
    .subscribe(
      data => {
        //  this.theResponse = data.json();
        this.navCtrl.push(HomePage);
        this.hideLoader();
      },
      () => console.log('Authentication Complete')
      );
  }


  postWithFile (url: string, postData: any, files: File[]) {
    this.showLoader();

    let headers = new Headers();
    headers.append('Authorization','Bearer '+this.appglobals.secret_key);
    let formData:FormData = new FormData();
    formData.append('file', files[0], files[0].name);

    formData.append('secret_key',this.appglobals.secret_key);
    // For multiple files
    // for (let i = 0; i < files.length; i++) {
    //     formData.append(`files[]`, files[i], files[i].name);
    // }

    if(postData !=="" && postData !== undefined && postData !==null){
      for (var property in postData) {
          if (postData.hasOwnProperty(property)) {
              formData.append(property, postData[property]);
          }
      }
    }

    var returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.appglobals.endpints.uploadMedia, formData, {
        headers: headers
      }).subscribe(
          res => {
           this.presentToast("File Uploaded Successfully");
            this.hideLoader();  
          },
          error => {
             this.presentToast("Error uploading file: ");
             console.log(error);
          }
      );
    });
    return returnReponse;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
