import { Component, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/models/ImageModel';
import { UploadService } from 'src/app/services/upload.service';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private uploadservice:UploadService) { }

  images= new Array<ImageModel>();

  ngOnInit() {
    

    if (localStorage.getItem("images")!=null){
      this.images=JSON.parse(localStorage.getItem("images"));
    }
    else{
      console.log("Nothing in localstorage");
    }
    console.log(this.images);

  }



  addImage(id:any){
    this.uploadservice.getImage(id).subscribe((ret)=>{
      let temp=ret;
      this.images.push(temp);
      localStorage.setItem('images',JSON.stringify(this.images));
    })
    

    
  }

  update(event:any){
    this.addImage(event);
    //console.dir("przyszły dane:"+event);
    //console.log("updating");
  }

}
