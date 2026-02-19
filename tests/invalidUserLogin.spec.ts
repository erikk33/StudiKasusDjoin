import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function InvalidUserLogin() {
    test('Automation testing validasi error jika login gagal', async ({ page }) => {
      //testing menuju halaman login
      await page.goto('https://baliberbagi.org/user/login');
      //Testing isi kolom bagian email
      const email = 'user@db0baa05-136d-4719-a988-9786c7959466gmail.com';
      await page.fill('input[name="email"]', `${email}`);
      //testing password diisi tidak sesuai
      const passwordinvalid = 'mockingtst'; 
      await page.fill('input[name="password"]', `${passwordinvalid}`);
      //testing klik tombol login 
      await page.getByRole('button', {
        name: 'Login'
      }).click();
      //testing validasi user login password salah
      await expect(page.getByText(/Email atau password tidak sesuai/i)).toBeVisible();
      // testing memastikan halaman tetap berada di halaman login karena input password salah
      await expect(page).toHaveURL(/login/);
    })
  }
  // InvalidUserLogin();