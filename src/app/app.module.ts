import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { CarComponent } from './component/car/car.component';
import { HeaderComponent } from './component/header/header.component';
import { CardDetailComponent } from './component/card-detail/card-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    HeaderComponent,
    CardDetailComponent
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
