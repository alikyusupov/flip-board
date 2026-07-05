import { inject,Injectable, NgZone } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

export interface YandexOAuthConfig {
  clientId: string;
  redirectUri: string;
  scope?: string;
}

export interface YandexOAuthResult {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface YandexUserInfo {
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: string;
  default_email: string;
  emails: string[];
  default_avatar_id: string;
  is_avatar_empty: boolean;
  default_phone: { id: number; number: string };
  psuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class YandexOAuthService {
  private readonly ngZone = inject(NgZone);
  private authWindow: Window | null = null;
  private authSubject = new Subject<YandexOAuthResult>();
  private checkInterval: ReturnType<typeof setInterval> | null = null;

  // Configuration from environment
  private readonly defaultConfig: YandexOAuthConfig = {
    clientId: environment.yandexOAuth.clientId,
    redirectUri: environment.yandexOAuth.redirectUri || `${window.location.origin}/auth/yandex-callback`,
  };

  /**
   * Initiates OAuth authorization via Yandex ID
   * Opens a popup window for user to login
   */
  authorize(config?: Partial<YandexOAuthConfig>): Observable<YandexOAuthResult> {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    // Build OAuth URL using implicit grant flow (token response)
    const authUrl = this.buildAuthUrl(finalConfig);
    
    // Calculate popup window position (centered)
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    // Open popup window
    this.authWindow = window.open(
      authUrl,
      'YandexOAuth',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes`
    );

    // Start checking for the auth result
    this.startAuthCheck(finalConfig.redirectUri);

    return this.authSubject.asObservable();
  }

  /**
   * Builds the Yandex OAuth authorization URL
   */
  private buildAuthUrl(config: YandexOAuthConfig): string {
    const params = new URLSearchParams({
      response_type: 'token', // Using implicit flow for SPA
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope || '',
      force_confirm: 'yes', // Always show confirmation dialog
      state: this.generateState() // CSRF protection
    });

    return `https://oauth.yandex.ru/authorize?${params.toString()}`;
  }

  /**
   * Generates a random state parameter for CSRF protection
   */
  private generateState(): string {
    const array = new Uint32Array(4);
    crypto.getRandomValues(array);
    const state = Array.from(array, dec => dec.toString(16)).join('');
    sessionStorage.setItem('yandex_oauth_state', state);
    return state;
  }

  /**
   * Starts periodic check for authorization result
   */
  private startAuthCheck(redirectUri: string): void {
    // Clear any existing interval
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      try {
        // Check if popup was closed by user
        if (!this.authWindow || this.authWindow.closed) {
          this.cleanup();
          this.authSubject.error(new Error('Authorization window was closed'));
          return;
        }

        // Try to access popup URL (will throw if cross-origin)
        const popupUrl = this.authWindow.location.href;
        
        // Check if redirected to our callback URL
        if (popupUrl.startsWith(redirectUri) || popupUrl.includes('#access_token=')) {
          this.ngZone.run(() => {
            this.handleCallback(popupUrl);
          });
        }
      } catch (e) {
        console.log(e)
        // Cross-origin error - popup is still on Yandex domain, continue waiting
      }
    }, 500);
  }

  /**
   * Handles the OAuth callback and extracts the token
   */
  private handleCallback(url: string): void {
    try {
      // Parse the hash fragment containing the token
      const hashParams = new URLSearchParams(url.split('#')[1]);
      
      const accessToken = hashParams.get('access_token');
      const tokenType = hashParams.get('token_type') || 'bearer';
      const expiresIn = parseInt(hashParams.get('expires_in') || '0', 10);
      const state = hashParams.get('state');
      const error = hashParams.get('error');

      // Check for errors
      if (error) {
        const errorDescription = hashParams.get('error_description') || error;
        this.cleanup();
        this.authSubject.error(new Error(errorDescription));
        return;
      }

      // Validate state parameter
      const savedState = sessionStorage.getItem('yandex_oauth_state');
      if (state !== savedState) {
        this.cleanup();
        this.authSubject.error(new Error('Invalid state parameter - possible CSRF attack'));
        return;
      }

      // Validate token presence
      if (!accessToken) {
        this.cleanup();
        this.authSubject.error(new Error('No access token received'));
        return;
      }

      // Success - emit the result
      const result: YandexOAuthResult = {
        accessToken,
        tokenType,
        expiresIn
      };

      this.cleanup();
      this.authSubject.next(result);
      this.authSubject.complete();
      
      // Recreate subject for future authorizations
      this.authSubject = new Subject<YandexOAuthResult>();

    } catch (e) {
      console.log(e)
      this.cleanup();
      this.authSubject.error(new Error('Failed to parse authorization response'));
    }
  }

  /**
   * Fetches user info using the access token
   */
  getUserInfo(accessToken: string): Observable<YandexUserInfo> {
    return new Observable(observer => {
      fetch('https://login.yandex.ru/info?format=json', {
        headers: {
          'Authorization': `OAuth ${accessToken}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data as YandexUserInfo);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  /**
   * Cleans up resources after authorization
   */
  private cleanup(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    if (this.authWindow && !this.authWindow.closed) {
      this.authWindow.close();
    }
    this.authWindow = null;

    sessionStorage.removeItem('yandex_oauth_state');
  }
}
