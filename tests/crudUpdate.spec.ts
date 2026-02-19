import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function UserSuperAdminUpdate() {
    test('Update bagian data kegiatan', async ({ page }) => {
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
      await page.getByLabel('Search').fill('Banjir Papua');
      //automation klik enter konfirmasi pencarian
      await page.keyboard.press('Enter');
      //automation klik ikon edit kegiatan
      await page.getByTitle('Edit kegiatan yayasan').click();
      await page.waitForTimeout(2000);
      await page.locator('#edit_nama_kegiatan').fill('Babat Hutan Jayapura');
      await page.waitForTimeout(500);
      await page.locator('#edit_kategori').selectOption({ label: 'Lingkungan' });
      await page.locator('#edit_deskripsi_kegiatan').fill('Pembakaran hutan menybeabkan banjir papua');
      await page.locator('#edit_tanggal_mulai').fill('2026-02-16');
      await page.locator('#edit_tanggal_selesai').fill('2026-02-25');
      await page.locator('#edit_tanggal_mulai_donasi').fill('2026-02-10');
      await page.locator('#edit_tanggal_selesai_donasi').fill('2026-02-20');
      await page.locator('#edit_lokasi').fill('Hutan Jayapura');
      await page.locator('select[name="status_kegiatan"]').filter({ visible: true }).selectOption('Sedang Berjalan');
      //automation klik tombol Simpan Perubahan Untuk menyimpan data kegiatan baru
      await page.getByRole('button', {
        name: 'Simpan Perubahan'
      }).click();
      //mengecheck data yang sudah diubah apakah berhasil disimpan
      await expect(page.getByText(/Babat Hutan Jayapura/)).toBeVisible();
    });
  } //UserSuperAdminUpdate();