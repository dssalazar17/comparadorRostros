import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';
import { CommunService } from '../../services/commun.service';

@Component({
  selector: 'app-compara-rostro',
  templateUrl: './compara-rostro.page.html',
  styleUrls: ['./compara-rostro.page.scss'],
})
export class ComparaRostroPage implements OnInit {

  foto1;
  foto2;
  loading;

  constructor(private camera:Camera,
    private base64:Base64,
    private sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private communService: CommunService ) { }

  ngOnInit() {
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    await this.camera.getPicture(options).then(async (fileuri) => {
        console.log(fileuri)
        let base64 = await this.convertBase64(fileuri)
        console.log(base64)
    });
  }

  async convertBase64(fileuri){
      await this.base64.encodeFile(fileuri).then((base64File: string) => {
        //console.log(base64File)
        //this.imgBase64 = base64File;
        //let imagen =  base64File.replace("data:image/*;charset=utf-8;base64,","");
        if(!this.foto1)
          this.foto1 = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
        else
          this.foto2 = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
        return base64File;
    });
  }

  async comparar(){
    await this.presentLoading("Realizando comparación..");

    let payload = {
      image1: this.foto1,
      image2: this.foto2
    }
    await this.communService.compararRostro(payload, this.communService.getToken()).then(resp => {
      console.log(resp)
    })
    this.loading.dismiss();
  }

  removePhoto(id){
    if(id==1)
      this.foto1 = "";
    else
      this.foto2 = "";
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({ message });
    return this.loading.present();
  }

  async mensajeToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: "danger",
      cssClass: "ion-text-center"
    });
    toast.present();
  }
}
