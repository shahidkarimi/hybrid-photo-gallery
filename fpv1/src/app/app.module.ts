import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UploadPage } from '../pages/upload/upload';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PreviewPage } from '../pages/preview/preview';
import { VideoPage } from '../pages/video/video';

import { MoverPage } from '../pages/mover/mover';

import { globalAppService } from '../pages/globals';


@NgModule({
  declarations: [
    MyApp,
    UploadPage,
    HomePage,
    LoginPage,
    PreviewPage,
    VideoPage,
    MoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UploadPage,
    HomePage,
    LoginPage,
    PreviewPage,
    VideoPage,
    MoverPage
  ],
  providers: [globalAppService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {

}
