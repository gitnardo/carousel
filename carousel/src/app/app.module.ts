import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatcarouselComponent } from './component/matcarousel/matcarousel.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { NewcarouselComponent } from './component/newcarousel/newcarousel.component';
import { CarComponent } from './component/car/car.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    MatcarouselComponent,
    NewcarouselComponent,
    CarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DragDropModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
