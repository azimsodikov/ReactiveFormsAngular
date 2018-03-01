import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';



@Injectable()
export class FielConfigService {
    constructor(private http: Http){}
    readyConfig: FieldConfig[];

    getFormConfig(){
        // json-server --watch db.json // command to run the terminal
        return this.http.get('http://localhost:3000/config')
            .map(
                (response)=> {
                    return this.readyConfig = response.json();                    
                }
            );
    }  
}