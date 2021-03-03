import { Component } from '@angular/core';
import { Image } from 'src/app/models/images';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  images: Image[] = [];
  selectedImage!: Image;
  maxImgId!: Number;
  minImgId!: Number;

  constructor(galleryService: GalleryService) {
    this.images = galleryService.getImageList();
    if (this.images[0]) {
      this.maxImgId = this.images[this.images.length - 1].id;
      this.minImgId = this.images[0].id;
      this.selectImage(this.images[0]);
    }
  }

  next() {
    let nextImgId =
      this.selectedImage.id + 1 <= this.maxImgId
        ? this.selectedImage.id + 1
        : this.minImgId;
    let nextImg: Image | undefined = this.getImgById(nextImgId);
    if (nextImg) {
      this.selectImage(nextImg);
    }
  }
  previous() {
    let prevImgId =
      this.selectedImage.id - 1 >= this.minImgId
        ? this.selectedImage.id - 1
        : this.maxImgId;
    let prevImg: Image | undefined = this.getImgById(prevImgId);
    if (prevImg) {
      this.selectImage(prevImg);
    }
  }
  decrease() {}
  increase() {}
  play() {}
  stop() {}

  selectImage(image: Image) {
    console.log(this.images);

    let foundImage = this.images.indexOf(image);
    console.log(foundImage);

    if (foundImage != -1) {
      if (this.selectedImage) {
        this.images.push(this.selectedImage);
      }
      this.selectedImage = this.images.splice(foundImage, 1)[0];
      this.images.sort((a, b) => {
        return a.id < b.id ? -1 : 1;
      });
    }
  }

  private getImgById(imageId: Number): Image | undefined {
    let found: boolean = false;
    let result: Image | undefined = undefined;
    for (const image of this.images) {
      if (image.id == imageId) {
        result = image;
      }
    }
    return result;
  }
}
