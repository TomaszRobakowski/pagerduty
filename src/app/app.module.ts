import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './functions/main_component.component';
import { RestService } from './rest.service';
import { HttpClientModule } from '@angular/common/http'
import { ScrollDispatcher } from '@angular/cdk/scrolling';

import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,

    AppRoutingModule,
    BrowserAnimationsModule
    ],
  providers: [ RestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
