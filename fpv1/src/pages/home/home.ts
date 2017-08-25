import { Component } from '@angular/core';

import { NavController,AlertController,LoadingController,ActionSheetController,ToastController,Platform,Loading } from 'ionic-angular';
import { Http, Headers,URLSearchParams } from '@angular/http';
import {Camera, File, Transfer, FilePath,FileChooser,VideoPlayer } from 'ionic-native';
import { globalAppService } from '../globals';
import { PreviewPage } from '../preview/preview';
import { VideoPage } from '../video/video';
import { UploadPage } from '../upload/upload';

import 'rxjs/Rx';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shahid = "Rgious";
  images = [{src:''}];
  currentMediaObject = null;
  previous_dir = -1;
  level_arr = [0];
  level_count = -1;
  loader:any = null;

  GRID_COLUMN = 3;

  lastImage: string = null;
  loading: Loading;
  debugText:string = "";
  theFileUrl:string = "";
  debugText1:string = "";
  constructor(public navCtrl: NavController,public http: Http,public alertCtrl: AlertController,public appglobals:globalAppService,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform) {
    this.images = [
    ];

  }
ionViewWillEnter(){
     this.downloadThings();
}
  public ngOnInit(): void {
  
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

  //ionViewDidLoad() {
  //  this.downloadThings();
  //}

createRange(number){
  var items: number[] = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
}


showLoader() {
    try{
    this.loader.present();
    }catch(e){
      
    }
  }

  hideLoader(){
    this.loader.dismiss();
  }

  downloadThings(show_loader:boolean=true){
    if(this.platform.width() > 400){
      this.GRID_COLUMN = 7;
    }
    if(show_loader==true)
      this.showLoader();

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization','Bearer '+this.appglobals.secret_key);
      let params: URLSearchParams = new URLSearchParams();
      params.set('group_id',this.appglobals.group_id);
      params.set('secret_key',this.appglobals.secret_key);
      params.set('folder_id',this.appglobals.current_directory.toString());
      this.http.get(this.appglobals.endpints.loadMedia,{search:params,headers:headers})
          .subscribe(
              data => {
              //  this.theResponse = data.json();
                  this.images = data.json();
                   this.hideLoader();
          });
  }

    createAFolder() {
        let prompt = this.alertCtrl.create({
            title: 'Create Folder',
            message: "Enter folder name",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                    // /    this.showLoader();
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                         headers.append('Authorization','Bearer '+this.appglobals.secret_key);
                        let reqData = JSON.stringify({secret_key:this.appglobals.secret_key,folder_name:data.title,parent_id:this.appglobals.current_directory});

                        this.http.post(this.appglobals.endpints.createFolder, reqData, {
                            headers: headers
                        })
                            .subscribe(
                                data => {
                                //  this.theResponse = data.json();
                                this.downloadThings();
                            },
                            () => console.log('Authentication Complete')
                        );

                    }
                }
            ]
        });
        prompt.present();
    }

    openMedia(media){
        if(media.is_dir==1){
          if(this.level_arr.indexOf(media.id) == -1){
            this.level_arr.push(media.id);
            this.appglobals.current_directory = media.id;
           
           //this.navCtrl.push(HomePage);
            this.downloadThings(false);
          }
        }else{
            if(media.file_type=='image'){
              this.appglobals.currentPhoto = media.src;
              let i:any;
              var onlyImages = [];
              for(i=0;i<this.images.length;i++){
                  if(this.images[i]['file_type']=="image" && this.images[i]['is_dir']==0){
                    onlyImages.push(this.images[i]);
                  }
              }
              this.navCtrl.push(PreviewPage,{images:onlyImages,selected_image:media.id});
            }else{
              this.appglobals.currentVideo = media.src;
              this.navCtrl.push(VideoPage);
            }
        }
    }

    moveBackOne(){
console.log(this.level_arr);
var previous_ff = 0;
      if(this.level_arr.length!=1){
         previous_ff = this.level_arr[this.level_arr.length-2];
            this.level_arr.splice(this.level_arr.length-1,1);
      }else{

      }

      this.appglobals.current_directory = previous_ff;

      this.downloadThings();
    }


    presentActionSheet() {
      var btns = [ 

        {
          text: 'Choose File',
         icon: 'camera',
          handler: () => {
            this.fileChooser();
          }
        },
        {
          text: 'Create Folder',
          icon: 'folder',
          handler: () => {
            this.createAFolder();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }];
      if(this.appglobals.current_directory != 0){
        btns.push({
          text:"Delete this folder",
          role: 'destructive',
          icon: 'rtash',
          handler : ()=>{
            if(this.appglobals.current_directory != 0){
              this.deleteFolder();
            }
          }
        });
      }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: btns
    });
    actionSheet.present();
  }

    deleteFolder(){
         let headers = new Headers();
          headers.append('Content-Type', 'application/json');

          let reqData = {secret_key:this.appglobals.secret_key,folder_id:this.appglobals.current_directory};

          this.http.post(this.appglobals.endpints.deleteFolder, reqData, {
                            headers: headers
          })
              .subscribe(
                  data => {
                  this.moveBackOne();
                  this.downloadThings();
              },
              () => console.log('Authentication Complete')
          );
    }
  /** New uploader by shaihd **/
  uploadImage(tp,_n) {
  // Destination URL
  var url = this.appglobals.endpints.uploadMedia;
 
  // File for Upload
  var targetPath =tp;
 
  // File name only
  var filename = _n;
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'secret_key': this.appglobals.secret_key,'folder_id':this.appglobals.current_directory}
  };
 
  const fileTransfer = new Transfer();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, this.appglobals.endpints.uploadMedia, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Upload Success');
    this.downloadThings();
  }, err => {
    this.loading.dismissAll()
    this.presentToast("Upload Failed");
    this.debugText1 = err.exception;
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

 fileChooser(){
if(this.platform.is('core') || this.platform.is('mobileweb')) {
     this.navCtrl.push(UploadPage);
     return;
   }
FileChooser.open()
  .then(uri =>{
      
      FilePath.resolveNativePath(uri)
      .then(filePath => {
        var file_name = filePath.substr(filePath.lastIndexOf("/")+1,filePath.length);
          this.uploadImage(filePath,file_name);
      })
      .catch(err => {
          this.presentToast("Error:"+err);
      });

  })
  .catch(e => console.log(e));
  }
}
