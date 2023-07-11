import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private _snackBar: MatSnackBar) { }

  ParseErrAPI(response : any) : string[] {
    console.log(response);
    const result : string[]= [];

    if(response.error){
      if(typeof response.error === 'string'){
        result.push(response.error);
      }else if(Array.isArray(response.error)){
        response.error.forEach((value : string) => {result.push(value)});
      } else {
        const mapErrors = response.error.errors;
        const inputs = Object.entries(mapErrors);
        inputs.forEach((array : any[]) => {
          const field = array[0];
          array[1].forEach((errMessagge: string) => {
            result.push(`${field} : ${errMessagge}`)
          })
        })
      };
      }
      if (result.length > 0) {
        const errorMessage = result.join(`\n`); 
        this._snackBar.open(errorMessage, '', {
          duration: 5000, 
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
      return result;
    }

  }
