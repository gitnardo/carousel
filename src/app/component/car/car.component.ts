import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragMove,
  CdkDragStart,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {fromEvent, interval, Observable, Subscription} from "rxjs";


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

  @ViewChild('containerCenter') containerCenter!: ElementRef;
  condition: boolean[] = [
    false,
    false,
    false,
    false,
    false,
  ];
  public trackSlideClicks = 0;
  private waitMilliseconds: Subscription | undefined
  resizeObservable$: Observable<Event> | undefined
  resizeSubscription$: Subscription | undefined
  private windowWidth:number | undefined;
  constructor(
    private element: ElementRef<any>
  ) {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      console.log('event: ', evt)
      this.windowWidth = window.innerWidth;
    })
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

  onDragMoved($event: CdkDragMove<Event>) {
    this.detectCollision();
  }

  onDragEntered($event: CdkDragEnter<any>) {
    console.log('cdk on enterered');
  }

  next() {
    console.log('next')
    // Check if we can still go more towards the right
    //if (this.trackSlideClicks <= 3) {
      this.trackSlideClicks++;
      let elm = this.element.nativeElement;
      let items = elm.getElementsByClassName('inside-wrapper');
      let a = 0;
      let scope = this;
      for (a; a <= items.length - 1; a++) {
        if (scope.windowWidth != undefined) {
          this.translate3d[a] = this.translate3d[a] + (scope.windowWidth / 5);
        }
      }

      this.waitMilliseconds = interval(50).subscribe((x =>{
        this.detectCollision();
      }));
   // }
  }



  prev() {
    // Check if we can still go more towards the left
    if (this.trackSlideClicks >= -3) {
      this.trackSlideClicks--;
      let elm = this.element.nativeElement;
      let items = elm.getElementsByClassName('inside-wrapper');
      let a = 0;
      let scope = this;
      for (a; a <= items.length - 1; a++) {
        if (scope.windowWidth != undefined) {
          this.translate3d[a] = this.translate3d[a] - (scope.windowWidth / 5);
        }
      }
      this.waitMilliseconds = interval(50).subscribe((x =>{
        this.detectCollision();
      }));
    }
  }

  private scaleMiddleSlide(items: string | any[] | undefined): void {

    const screenWidth = window.innerWidth / 2;
    let a = 0;
    if (items !== undefined) {
      for (a = 0; a <= items.length - 1; a++) {

        console.log('boundingClientRect.x');
        console.log(items[a].getBoundingClientRect().width);
        if (Math.round(items[a].getBoundingClientRect().left) >= (screenWidth - 150)
          && Math.round(items[a].getBoundingClientRect().left) <= (screenWidth + 150)) {
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

  public inside(rectangle1: { getBoundingClientRect: () => any; }, rectangle2: { getBoundingClientRect: () => any; }) {
    let rect1 = rectangle1.getBoundingClientRect();
    let rect2 = rectangle2.getBoundingClientRect();
    return rect1.top <= rect2.bottom && rect1.bottom >= rect2.top && rect1.left <= rect2.right && rect1.right >= rect2.left
  }

  public reset() {
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
