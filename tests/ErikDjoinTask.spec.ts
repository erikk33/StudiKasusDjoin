import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

function Userregister() {
  const emailRandom = randomUUID(); //untuk membuat random email menggunakan UUID 
  test('User Register Data Valid', async ({ page }) => {
    //fungsi Testing memunculkan halaman
    await page.goto('https://baliberbagi.org/user/register');
    //Testing Input kolom Register
    await page.fill('input[name = "nama_lengkap"]', 'jikan@fmaj');
    await page.fill('input[name ="no_telepon"]', '0895331309082');
    await page.fill('input[name = "email"]', `user@${emailRandom}gmail.com`);
    await page.fill('input[name = "password"]', 'test1234');
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

// Userregister();


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

// UserInvalidRegister();

function UserLoginTest() {
  //login menggunakan akun user donatur menggunakan data valid
  test('Login dengan email dan password yang valid', async ({ page }) => {
    //fungsi Testing memunculkan halaman
    await page.goto('https://baliberbagi.org/user/login');
    //fungsi testing untuk mengisi isian kolom halmaan login
    await page.fill('input[name="email"]', 'user@db0baa05-136d-4719-a988-9786c7959466gmail.com');
    await page.fill('input[name="password"]', 'test1234');
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

function InvalidUserLogin() {
  test('Automation testing validasi error jika login gagal', async ({ page }) => {
    //testing menuju halaman login
    await page.goto('https://baliberbagi.org/user/login');
    //Testing isi kolom bagian email
    await page.fill('input[name="email"]', 'user@db0baa05-136d-4719-a988-9786c7959466gmail.com');
    //testing password diisi tidak sesuai
    await page.fill('input[name="password"]', 'mockingtst');
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