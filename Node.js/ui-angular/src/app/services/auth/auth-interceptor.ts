import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public jwtToken = '';
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.getJwtToken())
        .pipe(switchMap(jwt => {
            this.jwtToken = jwt;
            const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` } });
            return next.handle(authReq);
        }));
    }
}
