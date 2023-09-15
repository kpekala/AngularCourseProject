import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) {
    
    }
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4TvCla1RG_aFLJJY3Qwyg_6_2dIMf8Nw',
            {email: email, password: password, returnSecureToken: true}
        );
    }
}