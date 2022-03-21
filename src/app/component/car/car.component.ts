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
  private boxWidth:number | undefined;
  constructor(
    private element: ElementRef<any>
  ) {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      // console.log('event: ', evt)
      // Track the window width when a window resize happens for example landscape and portrait switching.
      this.windowWidth = window.innerWidth;

      // If the window size reset view otherwise the view gets of out of hand
      this.reset();

      // If the window size changes recalculate the boxes width
      this.calcBoxWidth();

    })
  }

  ngOnInit(): void {
    // Set the box width from the start. To be used by die next and prev buttons
    this.calcBoxWidth();
  }

  /*
   * This function calculate the box width from the first to last box
  */
  private calcBoxWidth() {
    let elm = this.element.nativeElement;
    let itemRow = elm.getElementsByClassName('col-sm-2 ');
    this.boxWidth = itemRow[0].offsetWidth;

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
  }

  public next() {
    // Check if we can still go more towards the right
    //if (this.trackSlideClicks <= 3) {
      this.trackSlideClicks++;
      let elm = this.element.nativeElement;
      let items = elm.getElementsByClassName('inside-wrapper');
      let a = 0;
      // let scope = this;
      for (a; a <= items.length - 1; a++) {

        items[a].parentElement.parentElement.style.transform = 0;
        console.log(items[a].parentElement.parentElement.style);
        if (this.boxWidth !== undefined) {
          this.translate3d[a] = this.translate3d[a] + (this.boxWidth);
        }
      }

      this.waitMilliseconds = interval(50).subscribe((x =>{
        this.detectCollision();
      }));
   // }
  }



  public prev() {
    // Check if we can still go more towards the left
    if (this.trackSlideClicks >= -3) {
      this.trackSlideClicks--;
      let elm = this.element.nativeElement;
      let items = elm.getElementsByClassName('inside-wrapper');
      let a = 0;
     // let scope = this;
      for (a; a <= items.length - 1; a++) {
        if (this.boxWidth !== undefined) {
          this.translate3d[a] = this.translate3d[a] - (this.boxWidth);
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
