import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { Job } from '../interfaces/job';


@Injectable({
  providedIn: 'root'
})
export class JobService {

private ApiUrl = environment.url

  constructor(private _http : HttpClient) { 
  }

  getJobs():Observable<Job[]>{
    return this._http.get<Job[]>(this.ApiUrl+'job/get');
  }
}
