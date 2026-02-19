import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function UserInvalidRegister() {
    const emailRandom = randomUUID(); //untuk membuat random email menggunakan UUID 
    test('User Register Data invalid Input Password Kosong', async ({ page }) => {
      //fungsi Testing memunculkan halaman
      await page.goto('https://baliberbagi.org/user/register');
      //Testing Input kolom Register
      await page.fill('input[name = "nama_lengkap"]', 'Putu Erik cahyadi');
      await page.fill('input[name ="no_telepon"]', '083912812');
      await page.fill('input[name = "email"]', `user@${emailRandom}gmail.com`);
      /*memastikan kolom password memiliki atribut required kolom password wajib diisi dan muncul
      pemberitahuan bawaan html*/
      await expect(page.locator('input[name= "password"]')).toHaveAttribute('required');
      //testing klik tombol submit 
      await page.getByRole('button', { name: 'Submit' }).click();
      // validasi Memastikan user berada di halaman register karena pendaftaran gagal.
      await expect(page).toHaveURL(/register/);
    });
  }
  
  //UserInvalidRegister();