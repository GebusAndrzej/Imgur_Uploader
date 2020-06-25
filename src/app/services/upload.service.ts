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

  // had to use xhr request, because angular's POST won't send whole image
  async upload2(image:any){
    return new Promise((resolve,reject) => {

      // cut the data tags
      let img=image.substr(image.indexOf(',') + 1); 

      let fd =new FormData();
      fd.append('image',img);
      
  
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image', true);
      
      xhr.onload = resolve;
      xhr.onerror = reject;

      xhr.setRequestHeader("Authorization", this.userid);
  
      xhr.send(fd);
    })
    
  }


  // get specify image from imgur api 
  getImage(id:string):Observable <ImageModel>{
    const Header= new HttpHeaders({
      'Authorization':this.userid
    })
    return this.http.get<ImageModel>('https://api.imgur.com/3/image/'+id,{headers: Header});
  }



}
