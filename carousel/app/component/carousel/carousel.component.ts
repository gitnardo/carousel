import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() slides: number | undefined;
  private element: HTMLElement | undefined;

  public mousemovey:number = 0;

  setLeft: any = 300;
  private blockleft: any = 300;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  @HostListener('drag', ['$event'])

  changeBackground($event: DragEvent): void {
    // console.log($event.clientX);
    let calcX;
    if (this.mousemovey > $event.clientX){
      calcX = Number(this.mousemovey - $event.clientX);
    } else {
      calcX = Number($event.clientX - this.mousemovey);
    }

    console.log(calcX);
    this.renderer.setStyle($event.target, 'left', calcX + 'px');
    // this.renderer.setStyle($event.target, 'left', '1px');
    //console.log(this.mousemovey);
  }

  ngOnInit(): void {

    let dragElement: HTMLCollectionOf<Element> = document.getElementsByClassName('cell');

    let classes: DOMTokenList = dragElement[0].classList;
    console.log(classes);
    console.log(dragElement.length);
    classes.forEach((value, key, parent) => {

    })

    this.element = this.elementRef.nativeElement as HTMLElement;
    console.log(this.element);


    this.setLeft = 300;
  }

  public drag(event: any) {
   // event.preventDefault();
   // event.stopPropagation();
    //console.log(event);
    event.target.style.left = 300;
   // console.log(event.target.style.left)
    event.target.style.left +=1;
    this.setLeft += 1;
    this.blockleft += 1;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
  }

  mousemove($event: MouseEvent) {
//    console.log('mouse x');
 //  console.log($event.x);
   // console.log($event.y);
    this.mousemovey = $event.x;
    this.blockleft = $event.y;

  }

  dragend($event: DragEvent) {

  }

  style($event: any) {

  }

  getStyle() {
    return `left:${this.blockleft.value}`
  }
}
