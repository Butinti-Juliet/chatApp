import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ImghandlerService {
  uploadimage() {
    throw new Error("Method not implemented.");
  }
  nativepath: any;
  firestore = firebase.storage();
 
  
  constructor() { }

  // uploadimage() {
  //   var promise = new Promise((resolve, reject) => {
  //       this.filechooser.open().then((url) => {
  //         (<any>window).FilePath.resolveNativePath(url, (result) => {
  //           this.nativepath = result;
  //           (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
  //             res.file((resFile) => {
  //               var reader = new FileReader();
  //               reader.readAsArrayBuffer(resFile);
  //               reader.onloadend = (evt: any) => {
  //                 var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
  //                 var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
  //                 imageStore.put(imgBlob).then((res) => {
  //                   this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
  //                     resolve(url);
  //                   }).catch((err) => {
  //                       reject(err);
  //                   })
  //                 }).catch((err) => {
  //                   reject(err);
  //                 })
  //               }
  //             })
  //           })
  //         })
  //     })
  //   })    
  //    return promise;   
  // }

}
