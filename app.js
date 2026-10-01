console.log("Praktikum Dimulai");

// Aktivitas 1: DOM Selection DOM
// DOM Selection kita harus "Menangkap ELemen" Sebelum kita memanipulasi HTML
// Ambil elemen -> Simpan didalam variabel javascript

// 1.Ambil elemen Judul Berdasarkan ID
// document.getElementById("...") -> Ambil elemen HTML Spesifik berdasarkan ID
const judulUtama = document.getElementById ("judul-utama");

// 1.1 querySelector("#...")mengambil ID berdasarkan atribut ID
// Tanda (#) Artinya menargetkan ID(.) Menargetkan Class
// Ambil elemen Sub Judul Berdasarkan ID
const subJudul = document.querySelector("#sub-judul");

// 2.Mengambil elemen Pada Kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

//3.Mengambil Tombol "Aksi" Pada Kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

//4. Mengambil Elemen Pada Kartu 2 (fitur catatan dinamis/todolist)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");


// Aktivitas 2: Manipulasi Teks & Style (Pada Kartu 1)
// addEventListener("click, function") {...} -> artinya tolong dengarkan dan tunggu
// A. Mengubah Teks & Warna Teks Preview
btnUbahTeks.addEventListener("click", function(){
    // .innerText = Mengisi/Menimpa tulisan text yang ada di HTML
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM!";

    //.style.color = Mengubah warna teks secara langsung melalui javascript (inline)
    teksPreview.style.color = "#554aec";

    // console.log = Mencetak pesan di console
    console.log("DOM Teks Preview telah diperbaharui");
    });

    // B. Mengubah Warna Background Box Preview
    btnToggleWarna.addEventListener("click", function(){
        //.classList.toggle("nama-class") -> menambahkan c;lass jika belum ada,menghapus class jika sudah ada
        //Jika class tersebut belum ada pada elemen , maka class tersebut akan ditambahkan.
        //jika class tersebut sudah ada pada elemen ,maka class tersebut akan dihapus.
        boxPreview.classList.toggle("active-mode");
        cardManipulasi.classList.toggle("highlight");

        console.log("DOM Box telah diperbaharui");
    });

    //C.Mengembalikan Teks warna Teks Preview ke DEfault
    btnReset .addEventListener("click", function(){
        //Mengembalikan Teks Preview ke Default
        teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

        //Kosongkan Warna agar warna kembali ke dafault
        teksPreview.style.color = "";

        //Hapus class khusus menggunakan .classList.remove("nama-class")
        boxPreview.classList.remove("active-mode");
        cardManipulasi.classList.remove("highlight");

        console.log("DOM Box Preview telah dikembalikan ke default");
    });


    // Aktivitas 3 & 4 Membuat Catatn Dinamis (ToDoList) & Menghitung jumlah catatan (pada kartu 2)
    //Dibagian ini kita belajar membuat elemen HTML baru (<li>)secara dinamis menggunakan javascript
    //Lalu mengisi teksnya, memberi tombol hapus,lalu menempelkannya ke dalam layar


    //Langkah 1 : Membuat variabel untuk menampung jumlah catatan
    // 'let' digunakan karena nilainya akan berubah ubah (mutable)
    let totalCatatan = 0;

    //Langkah 2 : Membuat Fungsi untuk menambah catatan baru
    //Fungsi ini adalah kumpulan perintah yang diberi nama. KIta bisa memanggilnya kapanpun kita mau.
    function perbaruiJumlah(){
        //Masukkan angka totalCatatan kedalam elemen HTML jumlahCatatn
        jumlahCatatan.innerText = totalCatatan;

        //Percabangan kondisi : Apakah catatannya 0?
        if (totalCatatan === 0) {
            //Jika 0: Hapus class "hidden" agar pesan "Tidak ada Catatan" muncul
            pesanKosong.classList.remove("hidden");
        } else{
            // Jika > 0 : Tambahkan class "hidden" agar pesan  "Tidak ada catatan" hilang
            pesanKosong.classList.add("hidden");
        }
    }

//Langkah 3 :Membuat fungsi untuk menambahkan catatan baru
    function tambahCatatan(){
        // 3.1 inputCatatan.value -> Mwngambil teks yang diketik user di input
        // .trim() -> Menghapus spasi kosong di awal dan akhir teks 
        const isiTeks = inputCatatan.value.trim();

        //3.2 Validasi Input:JIka variabel isi teks kosong (""), maka tampilkan alert
        if(isiTeks === "") {
            alert("Catatan tidak boleh kosong!");
            return; // Hentikan fungsi jika input kosong
        }

        //3.3 createElement("li") -> membuat elemen HTML baru <li> hanya di memori javascript
        const liBaru = document.createElement("li");
        liBaru.className = "note-item"; // Memberi class agar tampilannya sesuai dengan style.css

        //3.4 Mengisi teks catatan baru dengan inner HTML mengisi<li> dengan teks dan tombol hapus
        //Tanda Backtick `` digunakan agar kita bisa menulis teks multi-baris dan menyisipkan variabel dengan $ {variabel}
        liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

        //3.5 Menambahkan event listener pada tombol hapus pada item <li>
        //querySelector(".btn-hapus") -> Mengambil tombol hapus yang baru dibuat di dalam <li>
        const btnHapus = liBaru.querySelector(".btn-hapus");
        btnHapus.addEventListener("click", function(){
            //Menghapus <li> dari daftarCatatan (<ul>)
            liBaru.remove(); // Menghapus elemen <li> fari DOM .remove()
            totalCatatan--; // Mengurangi jumlah catatan
            perbaruiJumlah(); // Memperbarui tampilan jumlah catatan
            console.log(`DOM Catatan "${isiTeks}" telah dihapus`);
        })

        //3.6 .appendChild(liBaru) -> Menampilkan <li> baru ke dalam <ul> daftarCatatan
        daftarCatatan.appendChild(liBaru);

        //3.7 Mengosongkan input setelah catatan ditambahkan 
        inputCatatan.value = "";

        //3.8 Menambah jumlah catatan dan memperbarui tampilan jumlah catatan
        totalCatatan++;
        perbaruiJumlah();

        console.log(`DOM Catatan baru ditambahkan : $"{isiTeks}"`);
    }

    //Langkah 4 : Event Listener untuk tombol tambah catatan
    // Ketik tombol tambah di klik, jalankan fungsi tambahCatatan
    btnTambah.addEventListener("click", function (){
        tambahCatatan();
    });

    // Langkah 5 : Event Listener untuk menambahkan catatan
    inputCatatan.addEventListener("keyup", function(){
        if (event.key === "Enter") {
            tambahCatatan();
        }
    });
