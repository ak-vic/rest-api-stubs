import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public oktaAuth: OktaAuthService) {}

  async getJwtToken(): Promise<string> {
    const jwt = await this.oktaAuth.getAccessToken();
    return jwt;
  }
}
