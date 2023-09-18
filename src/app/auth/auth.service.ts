import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new Subject<User>();
    
    constructor(private http: HttpClient) {
    
    }
    
    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4TvCla1RG_aFLJJY3Qwyg_6_2dIMf8Nw',
                {email: email, password: password, returnSecureToken: true}
            ).pipe(
                catchError(this.handleError), 
                tap((resData: AuthResponseData) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4TvCla1RG_aFLJJY3Qwyg_6_2dIMf8Nw',
                {email: email, password: password, returnSecureToken: true}
            ).pipe(
                catchError(this.handleError),
                tap((resData: AuthResponseData) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
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