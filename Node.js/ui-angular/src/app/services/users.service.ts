import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, map, tap } from 'rxjs/operators';
import * as config from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}
  private usersUrl = config.default.resourceServer.usersUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse, caught: Observable<User[]>): Observable<User[]> {
    console.error(JSON.stringify(error));
    if (error.error instanceof ErrorEvent) {
      if (error.status === 401) {
        // console.error('401', error.headers.get('Location'));
        // alert('401' + error.headers.get('Location'));
      }
      // console.error('An error occurred:', error.error.message);
    }
    return caught;
  }
}
