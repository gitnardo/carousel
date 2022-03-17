import {Component, ElementRef, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, moveItemInArray} from "@angular/cdk/drag-drop";
import {interval} from "rxjs";

@Component({
  selector: 'app-matcarousel',
  templateUrl: './matcarousel.component.html',
  styleUrls: ['./matcarousel.component.css']
})
export class MatcarouselComponent implements OnInit {

  public appPrev: ElementRef | undefined;
  public items:ElementRef | undefined;
  public itemsParent:ElementRef | undefined;

  public remeberberSlideInFocus: string | undefined;
  public movies:[] | undefined;
  public slides: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  public tmp: number[] = [60];
  movement: string = "";
  public easeOut = 0.15;
  showMyClass : boolean = false;
  tmp2: number =  1.5;

  constructor(
    private element: ElementRef<any>
  ) {
    if (this.appPrev !== undefined) {
      console.log(this.appPrev.nativeElement);
    }
    this.tmp2 = 1.5;
    this.tmp[0] = 60;
  }

  ngOnInit(): void {
    let elm = this.element.nativeElement; //.parentElement;
    let items = elm.getElementsByClassName('item');
    this.movies = items;
    console.log(this.movies);
  }

  prevMove($event: MouseEvent) {

    if (this.appPrev !== undefined) {
      console.log(this.appPrev.nativeElement);
    }


    let elm = this.element.nativeElement; //.parentElement;
    let items = elm.getElementsByClassName('item');
    this.movies = items;
    let itemsParent = items[0].parentElement;

    itemsParent.append(items[0]); //.prepend(item[3]);
    //elm.append(item[0]);
    //console.log(item[1]);
    this.tmp[0] = this.tmp[0] -300;
  }

  nextMove($event: MouseEvent) {
    let elm = this.element.nativeElement; //.parentElement;
    let items = elm.getElementsByClassName('item');
    let itemsParent = items[0].parentElement;

    itemsParent.prepend(items[items.length-1]); //.prepend(item[3]);
    this.tmp[0] = this.tmp[0] + 100;
  }


  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  onDragEnded($event: CdkDragEnd, index:any) {
    //this._index = index;
   // console.log(index);
    let element = $event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
   // console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));
    this.showMyClass = true;

/*
      interval(0.1).subscribe((x =>{
      if (this.tmp[0] <= 300) {
        this.tmp[0]++;
      }
        if (this.tmp[0] >= 300) {
          this.tmp[0]--;
        }

      }));
*/

    /*
    while (this.tmp >=300) {
      interval(78).subscribe((x =>{
      //  this.tmp--;
      }));
    }
*/
  }

  onDragMoved($event: CdkDragMove, i: number) {
   // console.log(i);
    // this.movement = ' ';
    let element = $event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
  // console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));

    let elm = this.element.nativeElement;
    let items = elm.getElementsByClassName('getit');

    this.tmp[0] = boundingClientRect.x - parentPosition.left;
    console.log(this.tmp);

    if (this.tmp2 <= 3) {
      this.tmp2 = this.tmp2 + 0.01;
    } else {
      this.tmp2 = 3.1;
    }

  }

  onDragStarted($event: CdkDragStart) {
    this.showMyClass = false;

  }
}
