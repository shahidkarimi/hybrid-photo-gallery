import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { globalAppService } from '../globals';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {

  public currentVideo:string;
  constructor(public navCtrl: NavController,public appglobals:globalAppService) {
  	this.currentVideo = appglobals.currentVideo;
  }

}
