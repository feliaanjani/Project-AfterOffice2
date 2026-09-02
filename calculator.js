// CALCULATOR
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function untuk mengubah input menjadi number
function toNumber(input) {
    return Number(input);
}

// Function untuk melakukan operasi matematika
function hitung(angka1, angka2, operasi) {
    switch (operasi) {
        case "+":
            return angka1 + angka2;

        case "-":
            return angka1 - angka2;

        case "*":
            return angka1 * angka2;

        case "/":
            return angka1 / angka2;

        default:
            return "Operasi tidak valid";
    }
}

// Input angka pertama
rl.question("Masukkan angka pertama: ", (input1) => {

    // Konversi input pertama menjadi number
    const angka1 = toNumber(input1);

    // Input angka kedua
    rl.question("Masukkan angka kedua: ", (input2) => {

        // Konversi input kedua menjadi number
        const angka2 = toNumber(input2);

        // Input operasi
        rl.question("Masukkan operasi (+, -, *, /): ", (operasi) => {

            // Hitung hasil
            const hasil = hitung(angka1, angka2, operasi);

            // Tampilkan hasil
            console.log("Hasil: ")
            console.log(`${angka1} ${operasi} ${angka2} = ${hasil}`);

            rl.close();
        });
    });
});