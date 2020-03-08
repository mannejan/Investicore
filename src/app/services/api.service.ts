import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { PropertyDto } from '../interface/property-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getPropertyDtos(): Observable<HttpResponse<PropertyDto>>{
    return this.http.get<PropertyDto>(`http://mogwai-dev.eu-west-1.elasticbeanstalk.com/api/properties/all`, {
      observe: 'response'
    })
  };

}
