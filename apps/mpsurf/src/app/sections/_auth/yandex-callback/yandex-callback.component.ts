import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

/**
 * Callback component for Yandex OAuth redirect
 * This component is displayed briefly in the popup window while processing the OAuth response
 * The parent window handles the actual token extraction via URL polling
 */
@Component({
  selector: 'app-yandex-callback',
  standalone: true,
  imports: [CommonModule, NzSpinModule],
  template: `
    <div class="callback-container">
      <nz-spin nzSimple [nzSize]="'large'"></nz-spin>
      <p>Авторизация...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
      
      p {
        font-size: 16px;
        color: #666;
      }
    }
  `]
})
export class YandexCallbackComponent implements OnInit {
  ngOnInit(): void {
    console.log("INIT")
    // The parent window polls this URL and extracts the token from the hash
    // This component just shows a loading state while that happens
    // The window will be closed automatically by the parent YandexOAuthService
  }
}
