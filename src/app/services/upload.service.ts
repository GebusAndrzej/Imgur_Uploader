import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageModel } from 'src/app/models/ImageModel';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  readonly userid = "Client-ID b84cfa028cbd253";

  constructor(private http:HttpClient) { }
  
  async upload2(image:any){
    return new Promise((resolve,reject) => {
      let img=image.substr(image.indexOf(',') + 1); 

      let fd =new FormData();
      let ret;
      fd.append('image',img);
  
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image', true);
      xhr.onload = resolve/*() => {
        ret = (JSON.parse(xhr.responseText));
        return new Promise (JSON.parse(xhr.responseText));
      }
      */
      xhr.onerror = reject;
      //xhr.responseType = 'json';
      //xhr.withCredentials = true;
      xhr.setRequestHeader("Authorization", this.userid);
  
      xhr.send(fd);
    })
    
  }

  uploadImage(image:any){
    //strip tags
    let img=image.substr(image.indexOf(',') + 1); 
    console.dir(img);

    //check if its image
    /*
    if (image.substr(5,5)=='image'){
      var param= new HttpParams()
      .set('image',img);
    }else{
      
    }
    */

    const param= new HttpParams()
      .append('image',img);

    const header= new HttpHeaders({
      'Authorization':this.userid
    });
    return this.http.post<ImageModel>('https://api.imgur.com/3/image',param,{headers:header});
  }
  


  getImage(id:string):Observable <ImageModel>{
    const Header= new HttpHeaders({
      'Authorization':this.userid
    })
    return this.http.get<ImageModel>('https://api.imgur.com/3/image/'+id,{headers: Header});
  }



   _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

}
