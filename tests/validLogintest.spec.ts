import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function UserLoginTest() {
    //login menggunakan akun user donatur menggunakan data valid
    test('Login dengan email dan password yang valid', async ({ page }) => {
      //fungsi Testing memunculkan halaman
      await page.goto('https://baliberbagi.org/user/login');
      //fungsi testing untuk mengisi isian kolom halmaan login
      const username = 'user@db0baa05-136d-4719-a988-9786c7959466gmail.com';
      const password = 'test1234';
      await page.fill('input[name="email"]',`${username}`);
      await page.fill('input[name="password"]', `${password}`);
      //Fungsi klik tombol Login
      await page.getByRole('button', {
        name: 'Login'
      }).click();
      //memastikan bagian halaman sudah tidak berada di halaman login
      await expect(page).not.toHaveURL(/login/);
      //Testing bagian halaman sudah berpindah ke halaman utama user donatur
      await expect(page).toHaveURL(/donatur/);
    });
  }
  // UserLoginTest();