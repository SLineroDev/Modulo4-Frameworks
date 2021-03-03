import { Component } from '@angular/core';
import { Image } from 'src/app/models/images';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  images: Image[] = [];
  maxImgId!: Number;
  minImgId!: Number;

  selectedImage!: Image;
  selectedImageWidth: String = '500px';

  nextDisabled: boolean = false;
  prevDisabled: boolean = true;

  isPlaying: boolean = false;
  intervalImg: Subscription | undefined;

  constructor(galleryService: GalleryService) {
    this.images = galleryService.getImageList();
    if (this.images[0]) {
      this.maxImgId = this.images[this.images.length - 1].id;
      this.minImgId = this.images[0].id;
      this.selectImage(this.images[0]);
    }
  }

  next() {
    let nextImgId = this.selectedImage.id + 1;
    if (nextImgId <= this.maxImgId) {
      let nextImg: Image | undefined = this.getImgById(nextImgId);
      if (nextImg) {
        this.selectImage(nextImg);
      }
      this.prevDisabled = false;
      if (nextImgId == this.maxImgId) {
        this.nextDisabled = true;
      }
    }
  }
  previous() {
    let prevImgId = this.selectedImage.id - 1;
    if (prevImgId >= this.minImgId) {
      let prevImg: Image | undefined = this.getImgById(prevImgId);
      if (prevImg) {
        this.selectImage(prevImg);
      }
      this.nextDisabled = false;
      if (prevImgId == this.minImgId) {
        this.prevDisabled = true;
      }
    }
  }
  decrease() {
    let selectedImg = document.getElementById('selected-img');
    if (selectedImg?.style.width) {
      let currentWidth = Number.parseInt(
        selectedImg.style.width.substring(0, selectedImg.style.width.length - 2)
      );
      selectedImg.style.width = currentWidth - 30 + 'px';
    }
  }
  increase() {
    let selectedImg = document.getElementById('selected-img');
    if (selectedImg?.style.width) {
      let currentWidth = Number.parseInt(
        selectedImg.style.width.substring(0, selectedImg.style.width.length - 2)
      );
      selectedImg.style.width = currentWidth + 30 + 'px';
    }
  }
  play() {
    this.isPlaying = true;
    this.intervalImg = interval(1000).subscribe((x) => {
      if (this.selectedImage.id != this.maxImgId) {
        this.next();
      } else {
        this.selectImage(this.images[0]);
        this.nextDisabled = false;
        this.prevDisabled = true;
      }
    });
  }
  stop() {
    this.isPlaying = false;
    if (this.intervalImg) {
      this.intervalImg.unsubscribe();
      this.intervalImg = undefined;
    }
  }

  selectImage(image: Image) {
    let foundImage = this.images.find((img) => img.id == image.id);
    if (foundImage) {
      this.selectedImage = foundImage;
    }
  }

  private getImgById(imageId: Number): Image | undefined {
    let found: boolean = false;
    let result: Image | undefined = undefined;
    for (let i = 0; i < this.images.length && !found; i++) {
      if (this.images[i].id == imageId) {
        result = this.images[i];
      }
    }
    return result;
  }
}
