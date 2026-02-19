import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function UserSuperAdminDelete() {
    test('Hapus bagian data kegiatan', async ({ page }) => {
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
      await page.getByLabel('Search').fill('Babat Hutan Jayapura');
      //automation klik enter konfirmasi pencarian
      await page.keyboard.press('Enter');
      //automation klik ikon edit kegiatan
      page.once('dialog', async dialog => {
        console.log(`Pesan Dialog: ${dialog.message()}`);
        // Opsional: Pastikan pesannya benar
        // expect(dialog.message()).toContain('hapus'); 
        await dialog.accept();
      });
      // 2. BARU KLIK TOMBOL HAPUS (TRIGGER)
      // Begitu diklik, dialog muncul, dan Listener di atas langsung menangkapnya.
      await page.getByTitle('hapus kegiatan').click();
  
      await page.waitForTimeout(1000);
      //mengecheck data yang sudah diubah apakah berhasil disimpan
      await expect(page.getByText(/Babat Hutan Jayapura/)).not.toBeVisible();
    });
  }
  //UserSuperAdminDelete();