import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../interfaces/activity';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private  activities:Activity[]=[];
  private readonly url='http://localhost:8080/activity'

    constructor(private readonly http:HttpClient) { }

    getActivitys():Observable<Activity[]>{
      return this.http.get<Activity[]>(`${this.url}/activitys`)
    }

    getActivitysLocal():Activity[]{
      return this.activities;
    }


    setActivities(act:Activity[]){
      this.activities=act;
    }

}
