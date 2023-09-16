import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

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
    
    constructor(private http: HttpClient) {
    
    }
    
    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4TvCla1RG_aFLJJY3Qwyg_6_2dIMf8Nw',
                {email: email, password: password, returnSecureToken: true}
            ).pipe(catchError(errorResponse => {
                let errorMessage = 'An uknown error occured';
                if(!errorResponse.error || !errorResponse.error.error){
                    return throwError(() => new Error(errorMessage));
                }
                switch(errorResponse.error.error.message){
                    case 'EMAIL_EXISTS' :
                        errorMessage = 'This email exists already';
                }
                return throwError(() => new Error(errorMessage));
            }));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4TvCla1RG_aFLJJY3Qwyg_6_2dIMf8Nw',
                {email: email, password: password, returnSecureToken: true}
            );
    }
}