import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  @Output() galleryupdate = new EventEmitter();

  constructor() { }

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
      this.readFile(this.files[0]).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        console.log(fileContents);
        window.scrollBy(0,300);
        this.galleryupdate.emit("1");
      })
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
