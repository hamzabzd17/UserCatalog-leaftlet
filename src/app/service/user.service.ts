import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { Response } from '../interface/response.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  // Fetch users
  getUsers(size: number = 10): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/?results=${size}`)
      .pipe(map(this.processResponse));
  }
  // Fetch one user using user UUID
  getUser(uuid: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/?uuid=${uuid}`)
      .pipe(map(this.processResponse));
  }

  //map user data to user interface
  processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            username: user.login.username,
            gender: user.gender,
            phone: user.phone,
            address: `${user.location.street.number} ${user.location.street.name} ${user.location.city},${user.location.country}`,
            dateOfBirth: user.dob.date,
            imageUrl: user.picture.medium,
            coordinate: {
              latitude: +user.location.coordinates.latitude,
              longtitude: +user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
