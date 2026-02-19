import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function crudUserSuperadminReadData() {
    test('Read bagian data kegiatan', async ({ page }) => {
      /*Sebelum melakukan fungsi Read superadmin harus login terlebih dahulu ke dalam sistem agar bisa melakukan fungsi read*/
      await page.goto('https://baliberbagi.org/user/login');
      //fungsi testing untuk mengisi isian kolom halmaan login
      await page.fill('input[name="email"]', 'chika@gmail.com');
      //isi password akun superadmin
      await page.fill('input[name="password"]', 'chika2013');
      //Fungsi klik tombol Login
      await page.getByRole('button', {
        name: 'Login'
      }).click();
      //memastikan bagian halaman sudah tidak berada di halaman login
      await expect(page).not.toHaveURL(/login/);
      //Testing bagian halaman sudah berpindah ke halaman utama user admin
      await expect(page).toHaveURL(/admin/);
      await page.getByTitle('Kegiatan').first().click();
      // klik kolom bagian search 
      await page.getByLabel('Search').fill('Banjir Papua');
      //automation klik enter konfirmasi pencarian
      await page.keyboard.press('Enter');
      /*automation memastikan data yang diinput sebelumnya dengan 
      nama kegiatan Banjir Papua ada*/
      await expect(page.getByText('Banjir Papua')).toBeVisible();
    });
  } //crudUserSuperadminReadData();