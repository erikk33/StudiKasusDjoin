import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
function crudUserSuperadmin() {
    test('Create', async ({ page }) => {
      //Sebelum melakukan fungsi create superadmin harus login terlebih dahulu ke dalam sistem agar bisa melakukan fungsi create
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
      await page.getByRole('button', {
        name: '+ tambah kegiatan baru'
      }).click();
      //testing isi data setiap kolom
      await page.fill('input[name="nama_kegiatan"]', 'Banjir Papua');
      await page.locator('#kategori').selectOption('Bencana Alam');
      await page.fill('[name="deskripsi_kegiatan"]', 'Titik Kumpul terlaksana di lokasi banjir jayapura dan sekitarnya');
      await page.locator('#tanggal_mulai').fill('2026-02-25');
      await page.locator('#tanggal_selesai').fill('2026-02-25');
      await page.locator('#tanggal_mulai_donasi').fill('2026-02-10');
      await page.locator('#tanggal_selesai_donasi').fill('2026-02-20');
      await page.fill('input[name="lokasi"]', 'Jayapura papua');
      await page.locator('select[name="status_kegiatan"]').filter({ visible: true }).selectOption('Direncanakan');
      //automation klik tombol Simpan Kegiatan Untuk menyimpan data kegiatan baru
      await page.getByRole('button', {
        name: 'Simpan Kegiatan'
      }).click();
      //pastikan data yang sudah di simpan sudah terlihat di halaman
      await expect(page.getByText(/Banjir Papua/)).toBeVisible();
    });
  } //crudUserSuperadmin();