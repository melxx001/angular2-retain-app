import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    JWT_KEY: string = 'jwt_token';
    JWT: string = '';

    constructor(private router: Router) {}

    isAuthorized(): boolean {
        return Boolean(this.JWT);
    }

    canActivate(): boolean {
        const activate = this.isAuthorized();
        this.onCanActivate(activate);
        return activate;
    }

    onCanActivate(activate: boolean) {
        if (!activate) {
            this.router.navigate(['', 'auth']);
        }
    }
}
