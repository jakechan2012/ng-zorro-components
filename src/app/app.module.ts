import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MyComponentsModule } from '@myscope/components';

import { AppComponent } from './app.component';
import { MockService } from './mock.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MyComponentsModule],
  providers: [MockService],
  bootstrap: [AppComponent]
})
export class AppModule {}
