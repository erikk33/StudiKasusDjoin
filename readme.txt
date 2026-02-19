================================================================
PANDUAN MENJALANKAN SCRIPT AUTOMATION (PLAYWRIGHT)
================================================================

Setiap soal (Login & CRUD) telah dipisahkan ke dalam function masing-masing agar pengujian lebih fokus dan terisolasi.

PERSIAPAN AWAL (SETUP):
Sebelum menjalankan script, mohon jalankan perintah berikut di terminal project untuk menginstall semua library/dependency yang dibutuhkan:
npm install
npx playwright install

PENTING:
Mohon jalankan function SATU PER SATU untuk menghindari error atau bentrok sesi browser.

CARA RUNNING TEST:
1. Buka file script utama (tests/ErikDjoinTask.spec.ts).
2. Scroll ke baris paling bawah (bagian pemanggilan function).
3. Hapus tanda komentar (//) HANYA pada function yang ingin diuji saat ini.
4. Pastikan function lainnya tetap diberi komentar (//).
5. Jalankan perintah: npx playwright test

DAFTAR FUNCTION & SOAL:
-----------------------
1. UserRegister()             -> Pendaftaran User Baru
2. UserInvalidRegister()      -> Validasi Pendaftaran User
3. UserLoginTest()            -> Login Valid (Positif Test)
4. InvalidUserLogin()         -> Login Invalid (Negatif Test/Validasi Error)
5. crudUserSuperadmin()       -> Soal CREATE (Tambah Data)
6. crudUserSuperadminRead()   -> Soal READ (Lihat/Cari Data)
7. UserSuperAdminUpdate()     -> Soal UPDATE (Edit Data)
8. UserSuperAdminDelete()     -> Soal DELETE (Hapus Data)

CONTOH PENGGUNAAN:
Jika ingin menguji fitur DELETE, pastikan baris kode terlihat seperti ini:

// UserLoginTest();
// UserSuperAdminUpdate();
UserSuperAdminDelete();  <-- Hanya ini yang aktif (tanpa //)


CATATAN KHUSUS (AKUN):
Untuk pengujian fitur CRUD (Tambah, Edit, Hapus), saya menggunakan akun user dengan role SUPERADMIN.
Alasannya: User biasa (hasil register baru) tidak memiliki izin akses untuk mengubah atau menghapus data di dalam sistem.

Terima kasih.