const readline = require("readline");

// Membuat interface untuk input user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function untuk menentukan kategori usia
function kategoriUsia(usia) {
    switch (true) {
        case usia >= 0 && usia <= 12:
            return "Anak-anak";

        case usia >= 13 && usia <= 17:
            return "Remaja";

        case usia >= 18 && usia <= 59:
            return "Dewasa";

        case usia >= 60:
            return "Lansia";

        default:
            return "Usia tidak valid";
    }
}

// Object untuk menghitung jumlah setiap kategori
const jumlahKategori = {
    'Anak-anak': 0,
    'Remaja': 0,
    'Dewasa': 0,
    'Lansia': 0
};

// Function untuk meminta input usia
function inputUsia() {
    rl.question("Masukkan usia (atau ketik 'exit' untuk selesai): ", (input) => {

        // Jika user ingin berhenti
        if (input.toLowerCase() === "exit") {
            console.log("\nJumlah orang setiap kategori:");
            console.log(jumlahKategori);
            rl.close();
            return;
        }

        const usia = parseInt(input);

        // Menentukan kategori
        const kategori = kategoriUsia(usia);

        if (kategori === "Usia tidak valid") {
            console.log("Usia tidak valid. Silakan masukkan angka usia yang benar.");
        } else {
            jumlahKategori[kategori]++;
            console.log(`Usia ${usia} tahun termasuk kategori ${kategori}`);
        }

        // Meminta input berikutnya
        inputUsia();
    });
}

//Jalankan program
inputUsia();