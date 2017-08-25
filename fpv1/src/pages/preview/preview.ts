import { Component,ViewChild } from '@angular/core';
import { Http, Headers,URLSearchParams } from '@angular/http';
import { NavController,ActionSheetController,ModalController,NavParams,Slides,AlertController } from 'ionic-angular';
import { globalAppService } from '../globals';
import { MoverPage } from '../mover/mover';

@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {

   @ViewChild(Slides) slides: Slides;

  public currentImage:string;
  public images = [];
  public selected_image = null;
  public selected_index:any = null;
  constructor(public http: Http,public navCtrl: NavController,public appglobals:globalAppService,public actionSheetCtrl: ActionSheetController,public modalCtrl: ModalController, private navParams: NavParams,public alertCtrl: AlertController) {
  	this.currentImage = appglobals.currentPhoto;
    this.images = navParams.get('images'); 
    this.selected_image = navParams.get('selected_image');
    var i:any;
    for(i=0;i<this.images.length;i++){
      if(this.selected_image==this.images[i].id){
          this.selected_index = i;
          break;
      }
    }
  }

  ionViewWillEnter(){
    this.goToSlide();
  }

  goToSlide() {
    this.slides.slideTo(this.selected_index, 0);
  }

  openModal() {
    let myModal = this.modalCtrl.create(MoverPage);
    myModal.present();
    console.log(this.images);
  }


  presendPhotoOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do with this photo?',
      buttons: [
        /*{
          text: 'Camera',
          //role: 'destructive',
          handler: () => {
            
          }
        },*/
        {
          text:"Delete",
          icon: "trash",
          role: 'destructive',
          handler : ()=>{
               this.showConfirmDelete();
          }
        },
        {
          text: 'Move',
          //role: 'destructive',
          icon: 'redo',
          handler: () => {
           this.openModal();
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteMedia(){
    // /    this.showLoader();
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                         headers.append('Authorization','Bearer '+this.appglobals.secret_key);
                        let reqData = JSON.stringify({'media_id':this.selected_image});

                        this.http.post(this.appglobals.endpints.deleteFile, reqData, {
                            headers: headers
                        })
                            .subscribe(
                                data => {
                                
                            },
                            () => console.log('Authentication Complete')
                        );
  }


  showConfirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure to delete this item?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteMedia();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
