import { Component } from '@angular/core';
import { image } from 'src/app/models/images';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  images: image[] = [];
  selectedImage!: image;

  constructor(galleryService: GalleryService) {
    this.images = galleryService.getImageList();
  }

  selectImage(image: image) {
    console.log(this.images);

    let foundImage = this.images.indexOf(image);
    console.log(foundImage);

    if (foundImage != -1) {
      if (this.selectedImage && this.selectedImage.id != -1) {
        this.images.push(this.selectedImage);
      }
      this.selectedImage = this.images.splice(foundImage, 1)[0];
      this.images.sort((a, b) => {
        return a.id < b.id ? -1 : 1;
      });
    }
  }
}
