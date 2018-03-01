import { FielConfigService } from './field-config.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    HttpModule
  ],
  providers: [FielConfigService],
  bootstrap: [AppComponent]
})

export class AppModule { }
