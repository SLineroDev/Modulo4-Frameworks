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
  selectedImageWidth: String = '450px';

  isPlaying: boolean = false;
  intervalImg: Subscription | undefined;

  firstPaginatorEl: number = 0;
  lastPaginatorEl: number = 3;

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
      let nextImgPos: number = this.getImgPosById(nextImgId);
      if (nextImgPos != -1) {
        this.selectImage(this.images[nextImgPos]);
        if (nextImgPos >= this.lastPaginatorEl) {
          this.nextList();
        }
      }
    } else {
      this.selectImage(this.images[0]);
      this.firstPaginatorEl = 0;
      this.lastPaginatorEl = 3;
    }
  }
  previous() {
    let prevImgId = this.selectedImage.id - 1;
    if (prevImgId >= this.minImgId) {
      let prevImgPos: number = this.getImgPosById(prevImgId);
      if (prevImgPos != -1) {
        this.selectImage(this.images[prevImgPos]);
        if (prevImgPos < this.firstPaginatorEl) {
          this.previousList();
        }
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
    this.intervalImg = interval(3000).subscribe(() => {
      this.next();
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

  previousList() {
    this.firstPaginatorEl -= 3;
    this.lastPaginatorEl -= 3;
    this.selectImage(this.images[this.firstPaginatorEl]);
  }

  nextList() {
    this.firstPaginatorEl += 3;
    this.lastPaginatorEl += 3;
    this.selectImage(this.images[this.firstPaginatorEl]);
  }

  private getImgPosById(imageId: number): number {
    return this.images.findIndex((img) => img.id == imageId);
  }
}
