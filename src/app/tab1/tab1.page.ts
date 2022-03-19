import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
// import { GoogleCloudVisionServiceService } from '../google-cloud-vision-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, AlertController, Platform, ToastController, ActionSheetController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage }  from '@ionic/storage';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
  loading: HTMLIonLoadingElement = null;
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult : any = [];
  images = [];
  result: null;

  selectedfeature:"OBJECT_LOCALIZATION"

radioGroupChange(event)
{

}

  constructor(
  private camera: Camera,
  // private vision: GoogleCloudVisionServiceService,
  private route : Router,
  public loadingController: LoadingController,
  public alertController: AlertController,
  private plt: Platform,
  private storage: Storage,
  private filePath : FilePath,
  private file: File,
  private webview: WebView,
  private toastController: ToastController,
  private actionSheetController: ActionSheetController,
  private ref: ChangeDetectorRef,
  private alertCtrl: AlertController,
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngOnInit(){
    // this.storage.get('storage_xxx').then((res)=>{
    //   console.log(res);
    //   this.datastorage = res;
    //   this.name = this.datastorage.name;
    //   this.alamat = this.datastorage.alamat;
    //   this.no_hp = this.datastorage.no_hp;
    //   this.email = this.datastorage.email;
    //   this.user_id = this.datastorage.id;
    //   this.foto_user = this.datastorage.foto_user;
    // });
    

   
    // this.plt.ready().then(() => {
    //   this.loadStoredImages();
    // })
  }

//   loadStoredImages() {
//     this.storage.get(STORAGE_KEY).then(images => {
//       if(images) {
//         let arr = JSON.parse(images);
//         this.images = [];
//         for (let img of arr) {
//           let filePath = this.file.dataDirectory + img;
//           let resPath = this.pathForImage(filePath);
//           this.images.push({ name: img, path: resPath, filePath: filePath});
//         }
//       }
//     });

//   }

//   pathForImage(img) {
//     if (img === null) {
//       return '';
//     } else {
//       let converted = this.webview.convertFileSrc(img);
//       return converted;
//     }
//   }

//     async presentToast(text) {
//       const toast = await this.toastController.create({
//         message: text,
//         position: 'bottom',
//         duration: 3000
//     });
//     toast.present();
//     }

//     async selectImage() {
//       const actionSheet = await this.actionSheetController.create({
//           header: "Select Image source",
//           buttons: [{
//                   text: 'Load from Library',
//                   handler: () => {
//                       this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
//                   }
//               },
//               {
//                   text: 'Use Camera',
//                   handler: () => {
//                       this.takePicture(this.camera.PictureSourceType.CAMERA);
//                   }
//               },
//               {
//                   text: 'Cancel',
//                   role: 'cancel'
//               }
//           ]
//       });
//       await actionSheet.present();
//     }



//     takePicture(sourceType: PictureSourceType) {
//       var options: CameraOptions = {
//           quality: 100,
//           sourceType: sourceType,
//           destinationType : this.camera.DestinationType.DATA_URL,
//           saveToPhotoAlbum: false,
//           correctOrientation: true


//       };
   
//       this.camera.getPicture(options).then(async imagePath => {
//           // if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
//           //     this.filePath.resolveNativePath(imagePath).then(filePath => {
//           //             let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
//           //             let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
//           //             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//           //         });
                 
//           // } else {
//           //     var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
//           //     var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//           //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//           // }

//           // alert(imagePath);

//           const loading = await this.loadingController.create({
//             message: 'Getting Results...',
//             translucent: true
//             });
        
            
//             await loading.present();
//             this.vision.getLabels(imagePath).subscribe(async (results : any) => {
//           //   let navigationExtras: NavigationExtras = {
//           //   queryParams: {
//           //   special: JSON.stringify(imagePath),
//           //   result : JSON.stringify(results),
//           //   feature : JSON.stringify(this.selectedfeature)
//           // }};

//           for(let datas of results){
//             this.scanResult.push(datas.responses[0].logoAnnotations);

//             alert(datas.name);
//           }

          
//           // this.scanResult = results.responses[0].logoAnnotations
//             // this.route.navigate(["showclass"],navigationExtras)
//             await loading.dismiss()
//             }, err => {
//             console.log(err);
//             });
//       });
   
//   }

//   createFileName() {
//     var d = new Date(),
//         n = d.getTime(),
//         newFileName = n + ".jpg";
//     return newFileName;
// }
 
// copyFileToLocalDir(namePath, currentName, newFileName) {
//     this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
//         this.updateStoredImages(newFileName);
//     }, error => {
//         this.presentToast('Error while storing file.');
//     });
// }
 
// updateStoredImages(name) {
//     this.storage.get(STORAGE_KEY).then(images => {
//         let arr = JSON.parse(images);
//         if (!arr) {
//             let newImages = [name];
//             this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
//         } else {
//             arr.push(name);
//             this.storage.set(STORAGE_KEY, JSON.stringify(arr));
//         }
 
//         let filePath = this.file.dataDirectory + name;
//         let resPath = this.pathForImage(filePath);
 
//         let newEntry = {
//             name: name,
//             path: resPath,
//             filePath: filePath
//         };
 
//         this.images = [newEntry, ...this.images];
//         this.ref.detectChanges(); // trigger change detection cycle
//     });
// }

// deleteImage(imgEntry, position) {
//   this.images.splice(position, 1);

//   this.storage.get(STORAGE_KEY).then(images => {
//       let arr = JSON.parse(images);
//       let filtered = arr.filter(name => name != imgEntry.name);
//       this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

//       var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

//       this.file.removeFile(correctPath, imgEntry.name).then(res => {
//           this.presentToast('File removed.');
//       });
//   });
// }

// async startUpload(imgEntry) {
//   this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
//       .then(entry => {
//           ( < FileEntry > entry).file(file => this.readFile(file))
//       })
//       .catch(err => {
//           this.presentToast('Error while reading file.');
//       });

//       const loading = await this.loadingController.create({
//         message: 'Getting Results...',
//         translucent: true
//         });
    
        
//         await loading.present();
//         this.vision.getLabels(imgEntry).subscribe(async (result) => {
//         let navigationExtras: NavigationExtras = {
//         queryParams: {
//         special: JSON.stringify(imgEntry),
//         result : JSON.stringify(result),
//         feature : JSON.stringify(this.selectedfeature)
//         }};
//         this.route.navigate(["showclass"],navigationExtras)
//         await loading.dismiss()
//         }, err => {
//         console.log(err);
//         });
// }

// readFile(file: any) {
//   const reader = new FileReader();
//   // const data_user = JSON.parse(localStorage.getItem('data'));

//   // this.user_id = data_user.data.id;
//   reader.onloadend = () => {
//       const formData = new FormData();
//       const imgBlob = new Blob([reader.result], {
//           type: file.type
//       });
//       formData.append('foto_user', imgBlob, file.name);
//       // formData.append('id', this.user_id);
//       this.uploadImageData(formData);
//   };
//   reader.readAsArrayBuffer(file);
// }

// async uploadImageData(formData: FormData) {
//   // const loading = await this.loadingCtrl.create({
        
//   // });
//   // await loading.present();

//   // this.http.post("http://103.226.139.41/api/Auth/upload", formData)
//   //     .pipe(
//   //         finalize(() => {
//   //             loading.dismiss();
//   //         })
//   //     )
//   //     .subscribe(res => {
//   //         if (res['success']) {
//   //             this.loadPhoto()
//   //             this.presentToast('File upload complete.')
//   //         } else {
//   //             this.presentToast('File upload failed.')
//   //         }
//   //     });
// }

  
//   async presentAlert(a) {
//     const alert = await this.alertCtrl.create({
//       cssClass: 'my-custom-class',
//       header: a,
//       backdropDismiss : false,
//       buttons: [
//         {
//           text: 'Close',
         
         
//           handler: (blah) => {
//             console.log('Confirm Cancel: blah');
//           }
//         }, {
//           text: 'Try Again',
//           handler: () => {
            
//             // this.loadUsers();
//           }
//         }
//       ]
//     });

//     await alert.present();
//   }
  


  


}
