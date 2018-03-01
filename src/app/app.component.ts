import { BehaviorSubject } from 'rxjs';
import { async } from '@angular/core/testing';
import { FielConfigService } from './field-config.service';
import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html' 
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild(DynamicFormComponent) forms: DynamicFormComponent;
  private form: DynamicFormComponent;

  private subject = new BehaviorSubject<DynamicFormComponent>(this.form);
  
  config: FieldConfig[];
  constructor(private configService: FielConfigService){
    
  }
  
  
  ngOnInit(){
 

    this.configService.getFormConfig()
    .subscribe((response: FieldConfig[]) => {
      this.config = response;      
    })
    
  }
  
  ngAfterViewInit() {
    this.subject
    .delay(100)
    .subscribe(() => {
      this.form = this.forms;
      let previousValid = this.form.valid;
      this.form.changes.subscribe(() => {
        if (this.form.valid !== previousValid) {
          previousValid = this.form.valid;
          this.form.setDisabled('submit', !previousValid);
        }
        // this.form.setDisabled('submit', true);
        // this.form.setValue('name', 'Todd Motto');
    })

    });


  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }




}
