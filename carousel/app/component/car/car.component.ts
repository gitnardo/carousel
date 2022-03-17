import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragMove,
  CdkDragStart,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {interval, Subscribable, Subscription} from "rxjs";


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public tmp: number[] = [
    0,
    0,
    0,
    0,
    0
  ];
  public translate3d: number[] = [
    0,
    0,
    0,
    0,
    0
  ];
  @ViewChild('someInput') someInput!: ElementRef;
  @ViewChild('containerCenter') containerCenter!: ElementRef;
  condition: boolean[] = [
    false,
    false,
    false,
    false,
    false,
  ];
  private trackSlideClicks = 0;
  private waitMilliseconds: Subscription | undefined

  constructor(
    private element: ElementRef<any>
  ) {
  }

  ngOnInit(): void {
    let elm = this.element.nativeElement;
    let items = elm.getElementsByClassName('inside-wrapper');
    let a = 0;
    for (a; a <= items.length - 1; a++) {
      let blockLeftPosition = Math.round(items[a].getBoundingClientRect().left);
      console.log(items[a].getBoundingClientRect());
      this.tmp[a] = blockLeftPosition;
      // console.log(this.tmp);
    }

  }

  ngAfterViewInit() {
    // make sure all elements are on the page before doing collision detection
    this.detectCollision();
  }


  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {top: y, left: x};
  }

  onDragMoved($event: CdkDragMove, i: number) {
    //console.log($event);
    // this.movement = ' ';
    let element = $event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    // console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));

    //let elm = this.element.nativeElement;
    //let items = elm.getElementsByClassName('getit');


    //this.tmp[0] = this.tmp[0]+( boundingClientRect.x / 100); //(boundingClientRect.x - parentPosition.left);
    // this.tmp[1] = 200+ (boundingClientRect.x / 100);
    //  this.tmp[1] = 320+ (boundingClientRect.x - parentPosition.left);
    //console.log(this.tmp);

    this.detectCollision();
    /*
    let elm = this.element.nativeElement;
    let items = elm.getElementsByClassName('inside-wrapper');
    let a = 0;
    const screenWidth = window.innerWidth / 2;
    for (a; a <= items.length - 1; a++) {
      if (Math.round(items[a].getBoundingClientRect().left) >= (screenWidth - 130)
        && Math.round(items[a].getBoundingClientRect().left) <= (screenWidth + 130)) {

        console.log(items[a].getBoundingClientRect().left >= (screenWidth - 130));
        this.condition[a] = true;
      } else {
        this.condition[a] = false;
      }
    }

     */

    /*
        let ttt = this.someInput.nativeElement.getBoundingClientRect();
        console.log(ttt.left);
        const screenWidth = window.innerWidth / 2;
        if (ttt.left >= (screenWidth - 250) && ttt.left <= (screenWidth + 250)) {
          this.condition = true;
        } else {
          this.condition = false;
        }

     */
    /*
    if (this.tmp[0] >= 1) {
      this.tmp[0] = ttt.left / 500;
    } else {
      this.tmp[0] = 1.1;
    }*/
    //  console.log(window.innerWidth / 200)
    //this.anchorMouseOffset.left = ( $event.clientX - anchorRect.left );
    // this.anchorMouseOffset.top = ( $event.clientY - anchorRect.top );

    // console.log(this.someInput.nativeElement.offsetLeft)


  }

  onDragEntered($event: CdkDragEnter<any>) {
    console.log('cdk on enterered');

  }

  next() {
    // Check if we can still go more towards the right
    if (this.trackSlideClicks <= 3) {
      this.trackSlideClicks++;
      let elm = this.element.nativeElement;
      let items = elm.getElementsByClassName('inside-wrapper');
      let a = 0;
      for (a; a <= items.length - 1; a++) {

        this.translate3d[a] = this.translate3d[a] + (window.innerWidth / 5);

      }

      this.waitMilliseconds = interval(50).subscribe((x =>{
        this.detectCollision();
      }));
    }
  }



  prev() {
    // Check if we can still go more towards the left
    if (this.trackSlideClicks >= -3) {
      this.trackSlideClicks--;
      let elm = this.element.nativeElement;
      let items = elm.getElementsByClassName('inside-wrapper');
      let a = 0;
      for (a; a <= items.length - 1; a++) {
        this.translate3d[a] = this.translate3d[a] - (window.innerWidth / 5);
      }
      //this.scaleMiddleSlide(items);

      let scope = this;
      setTimeout(function () {
        scope.detectCollision();
      }, 20);
    }
  }

  private scaleMiddleSlide(items: string | any[] | undefined): void {

    const screenWidth = window.innerWidth / 2;
    let a = 0;
    if (items !== undefined) {
      for (a = 0; a <= items.length - 1; a++) {

        console.log('boundingClientRect.x');
        console.log(items[a].getBoundingClientRect().width);
        if (Math.round(items[a].getBoundingClientRect().left) >= (screenWidth - 130)
          && Math.round(items[a].getBoundingClientRect().left) <= (screenWidth + 130)) {

          //console.log(items[a].getBoundingClientRect().left >= (screenWidth - 200));
          this.condition[a] = true;
        } else {
          this.condition[a] = false;
        }
      }
    }
  }

  private detectCollision() {
    let ttt = this.containerCenter.nativeElement; //.getBoundingClientRect();

    let elm = this.element.nativeElement;
    let items = elm.getElementsByClassName('inside-wrapper');
    let a = 0;
    for (a; a <= items.length - 1; a++) {
      let answer = this.inside(items[a], ttt);
      if (answer) {
        this.condition[a] = true;
      } else {
        this.condition[a] = false;
      }

    }
  }

  /*
    collide(rectanlge1, rectangle2) {
        let rect1 = rectanlge1.getBoundingClientRect();
        let rect2 = rectangle2.getBoundingClientRect();

        return !(
          rect1.top > rect2.bottom ||
          rect1.right < rect2.left ||
          rect1.bottom < rect2.top ||
          rect1.left > rect2.right
        );

    }
  */
  inside(rectangle1: { getBoundingClientRect: () => any; }, rectangle2: { getBoundingClientRect: () => any; }) {
    let rect1 = rectangle1.getBoundingClientRect();
    let rect2 = rectangle2.getBoundingClientRect();
    return rect1.top <= rect2.bottom && rect1.bottom >= rect2.top && rect1.left <= rect2.right && rect1.right >= rect2.left
  }

  reset() {
    let elm = this.element.nativeElement;
    let items = elm.getElementsByClassName('inside-wrapper');
    let a = 0;
    for (a; a <= items.length - 1; a++) {
      this.condition[a] = false;
      this.translate3d[a] = 0;
      console.log(items[a].parentElement.parentElement.style.transform)
      //items[a].styleAttribute.remove("transform");
      items[a].parentElement.parentElement.style.removeProperty('transform');
      items[a].parentElement.style.removeProperty('transform');
    }
    this.detectCollision();
  }

}
