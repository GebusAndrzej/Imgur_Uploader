import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  @Output() galleryupdate = new EventEmitter();

  constructor(private uploadservice: UploadService) { }

  ngOnInit() {
  }

  files: File[] = [];
 
  // add images 
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  //removing images
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  send(){
    if (this.files.length>0){
      for (let i=0;i<this.files.length;i++){
        
        this.readFile(this.files[i]).then(fileContents => {
          // Put this string in a request body to upload it to an API.
          //console.log(fileContents);
          /*
          this.uploadservice.uploadImage(fileContents).subscribe((ret)=>{
            console.dir(ret);
            this.galleryupdate.emit(ret.data.id);
          })
          */
         this.uploadservice.upload2(fileContents).then((ret:any)=>{
            ret = JSON.parse(ret.target.response);
            this.galleryupdate.emit(ret.data.id);
         })
        })
        
      }
      window.scrollBy(0,300);
    }
  }


  //  Parse image file to base64
  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
  
      reader.readAsDataURL(file);
    });
  }

}
