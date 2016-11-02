import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService implements CanActivate {
    JWT_KEY: string = 'jwt_token';

    constructor(
        private router: Router,
        private storeHelper: StoreHelper,
        private store: Store,
        private api: ApiService
    ) {
        const token = window.localStorage.getItem(this.JWT_KEY);

        if (token) {
            this.setJwt(token);
        }
    }

    setJwt(jwt: string) {
        if (jwt !== null) {
            window.localStorage.setItem(this.JWT_KEY, jwt);
            this.api.setHeaders({Authorization: `Bearer: ${jwt}`});
        }
    }

    isAuthorized(): boolean {
        return Boolean(window.localStorage.getItem(this.JWT_KEY));
    }

    canActivate(): boolean {
        const activate = this.isAuthorized();
        if (!activate) {
            this.router.navigate(['', 'auth']);
        }
        return activate;
    }

    // Handle signin and signout
    authenticate(path, credits): Observable<any> {
        return this.api.post(`/${path}`, credits)
            .do((response: any) => this.setJwt(response.token))
            .do((response: any) => this.storeHelper.update('user', response.data))
            .map((response: any) => response.data);
    }

    signout() {
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.purge();
        this.router.navigate(['', 'auth']);
    }
}
