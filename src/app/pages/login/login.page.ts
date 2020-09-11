import { Component, OnInit } from '@angular/core';
import { CommunService } from '../../services/commun.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  access_key_id;
  secret_access_key;
  loading;

  constructor(private communService: CommunService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
  }

  async login() {
    await this.presentLoading("Iniciando sesión");
    let body = {
      "access_key_id": this.access_key_id, //"W94oWs1vkCE5RUQgfiQQ",
      "secret_access_key": this.secret_access_key //"akMDrcgRgIAIbdFy9o4MdW7JUcri2iNAainrcNSD"
    }
    await this.communService.login(body).then(resp => {
      console.log(resp)
      if(resp.status=="Success"){
        this.router.navigate(['/compara-rostro']);  
      }else{
        this.mensajeToast('Error desconocido');
      }
    })
    this.loading.dismiss();
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
