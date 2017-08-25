import { Injectable } from '@angular/core';

@Injectable()
export class globalAppService {
    public current_directory:number = 0;
    public user_id:string = "1";
    public group_id:string = "f1";

//Genymotion 10.0.3.2
    public serverUrl:string = "http://localhost/authApp/?r=";

    public currentPhoto:string = '';

    public currentVideo: string = '';

    public secret_key:string = null;

    public endpints = {
        loadMedia:'',
        fileUpload: '',
        createFolder: '',
        deleteFolder: '',
        login:'',
        uploadMedia: '',
        folderList: '',
        folderListBack:'',
        deleteFile:''
    };

    public images = [];
    constructor(){
        this.endpints.loadMedia = this.serverUrl+"Media/index";
        this.endpints.fileUpload = this.serverUrl+"Media/upload";
        this.endpints.createFolder = this.serverUrl+"Media/createFolder";
        this.endpints.deleteFolder = this.serverUrl+"/media/folder/delete";
        this.endpints.login = this.serverUrl +"Auth/Login";
        this.endpints.uploadMedia = this.serverUrl +"Media/upload";
        this.endpints.folderList = this.serverUrl + "Folder/listing";
        this.endpints.folderListBack = this.serverUrl + "Folder/back"
        this.endpints.deleteFile = this.serverUrl + "Media/delete";
        this.secret_key = localStorage.getItem('skey');
    }
}