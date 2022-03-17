import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from "@angular/animations";
import {CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-newcarousel',
  templateUrl: './newcarousel.component.html',
  styleUrls: ['./newcarousel.component.css']
})
export class NewcarouselComponent implements OnInit {

  public items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
  ];
  done = ['Get up'];

  private player: AnimationPlayer | undefined;

  // @ts-ignore
  @ViewChild('carousel') private carousel: ElementRef;
  showControls = true ;
  carouselWrapperStyle = {};
  private currentSlide = 5;
  private itemWidth: number = 60;
  @Input() timing = '250ms ease-in';
  tmp: number[] = [10,20,30,40,50,60];

  constructor(private builder: AnimationBuilder) { }

  ngOnInit(): void {
  }


  next() {
    if (this.currentSlide + 1 === this.items.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
  prev() {
    if (this.currentSlide === 0) return;

    this.currentSlide =
      (this.currentSlide - 1 + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation(offset: number) {
    return this.builder.build([
      //animate(this.timing, style({ transform: `translateX(-100px)` })),
      animate(this.timing, style({ left: `-100px` })),
    ]);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dragAll($event: CdkDragMove<string[]>) {
   // if (this.currentSlide === 0) return;
  console.log($event);
     if (this.currentSlide + 1 === this.items.length) return;
    this.currentSlide = 2; //(this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    console.log(offset);
    this.tmp[0] = 123;
    this.tmp[1] = 223;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
   // myAnimation.create(this.items[3]);
    this.player.play();
  }
}
