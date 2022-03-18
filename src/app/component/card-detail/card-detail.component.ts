import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  @Input() cardTitle:string;
  @Input() showCalltoAction:boolean = false;

  constructor() {
    this.cardTitle = 'Card Title';
    this.showCalltoAction = false;
  }

  ngOnInit(): void {
  }

}
