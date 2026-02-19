import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

function Userregister() {
  const emailRandom = randomUUID(); //untuk membuat random email menggunakan UUID 
  test('User Register Data Valid', async ({ page }) => {
    //fungsi Testing memunculkan halaman
    await page.goto('https://baliberbagi.org/user/register');
    //Testing Input kolom Register
    const password = 'test1234';
    await page.fill('input[name = "nama_lengkap"]', 'jikan@fmaj');
    await page.fill('input[name ="no_telepon"]', '0895331309082');
    await page.fill('input[name = "email"]', `user@${emailRandom}gmail.com`);
    await page.fill('input[name = "password"]', `${password}`);
    await page.getByLabel('Saya bersedia dihubungi untuk berpartisipasi dalam kegiatan yayasan.').check();
    //testing klik tombol submit 
    await page.getByRole('button', { name: 'Submit' }).click();
    /*test menambahkan Assertions validasi agar memastikan data pendaftaran 
    masuk dengan check halaman saat ini register
    telah berpindah dari halaman register 
    ke halaman login */
    await expect(page).not.toHaveURL(/register/);
  });
}

//Userregister();