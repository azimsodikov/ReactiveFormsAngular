import { Component, EventEmitter, Input, OnChanges, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() config: FieldConfig[] = []; 

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;


  ngAfterViewInit() {

  }

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get changes() { 
    // console.log('dynamic-form', this.config);
    return this.form.valueChanges; 
  }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  
  
  constructor(private fb: FormBuilder) {}

  
  ngOnInit() {
    this.form = this.createGroup();
    console.log('dynamic-forms', this.form);
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup() {
    // console.log('createGroup', this.config);
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    
    // const { disabled, validation, value } = config;

    const disabled = config.disabled;
    const validation = config.validation
      .map(
        cv => {
          // console.log("map", cv, ind);
          switch (cv && cv.toString()) {
            case "Validators.required" :
              return Validators.required
            case "Validators.minLength(4)" :
              return Validators.minLength(4)
            case "Validators.email":
              return Validators.email;
          }
        }
      );
    const value = config.value;

    // console.log("validation", validation);

    return this.fb.control({disabled, value}, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable': 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
}
