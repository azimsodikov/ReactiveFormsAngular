import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-radio',
  styleUrls: ['form-radio.component.scss'],
  template: `
    <div 
    class="dynamic-field form-radio" 
    [formGroup]="group">
    <label>{{ config.label }}</label>
    <span *ngFor="let opt of config.options">
        <input
            type="radio"
            value="{{opt}}"
            [formControlName]="config.name">
        <label for="opt">{{opt}}</label>
    </span>
    </div>
  `
})
export class FormsRadioComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
