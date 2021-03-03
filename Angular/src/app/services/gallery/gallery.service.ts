import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/images';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private imageList: Image[] = [
    { id: 1, src: 'assets/img1.jpg', title: 'Imagen 1' },
    { id: 2, src: 'assets/img2.jpg', title: 'Imagen 2' },
    { id: 3, src: 'assets/img3.jpg', title: 'Imagen 3' },
    { id: 4, src: 'assets/img4.jpg', title: 'Imagen 4' },
    { id: 5, src: 'assets/img5.jpg', title: 'Imagen 5' },
    { id: 6, src: 'assets/img6.jpg', title: 'Imagen 6' },
    { id: 7, src: 'assets/img7.jpg', title: 'Imagen 7' },
    { id: 8, src: 'assets/img8.jpg', title: 'Imagen 8' },
  ];

  constructor() {}

  getImageList(): Image[] {
    return this.imageList;
  }
}
