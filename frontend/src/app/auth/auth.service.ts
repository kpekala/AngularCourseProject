import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import {environment} from '../../environments/environment';

export interface AuthResponseData {
    token: string,
    expiresIn: number
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    
    constructor(private http: HttpClient, private router: Router) {
    
    }
    
    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'http://localhost:8080/api/signup', {email: email, password: password}
            ).pipe(
                catchError(this.handleError), 
                tap((resData: AuthResponseData) => {
                    this.handleAuthentication(email, resData.token, resData.expiresIn);
            }));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'http://localhost:8080/api/login',
                {email: email, password: password}
            ).pipe(
                catchError(this.handleError),
                tap((resData: AuthResponseData) => {
                    this.handleAuthentication(email, resData.token, resData.expiresIn);
            }));
    }

    autoLogin() {
        type UserData = {
            email: string;
            _token: string;
            _tokenExpirationDate: string;
        };
        const userData: UserData = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        
        const loadedUser = new User(
            userData.email, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            this.tokenExpirationTimer.clear();
        }
     }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An uknown error occured';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(() => new Error(errorMessage));
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS' :
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Login credentials are not correct.';
                break;
        }
        return throwError(() => new Error(errorMessage));
    }
}