/* =========================================================
   MAIN.JS
   General website functionality
   ========================================================= */


/* =========================================================
   1. CURRENT YEAR
   ========================================================= */

/*
 * Mengambil tahun secara otomatis dari sistem.
 *
 * Jadi footer tidak perlu diubah setiap tahun.
 */

const currentYear = document.querySelector(
    "#currentYear"
);


if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   2. PLACEHOLDER PROJECT LINKS
   ========================================================= */

/*
 * Beberapa project pada HTML masih menggunakan:
 *
 * href="#"
 *
 * Link tersebut belum memiliki halaman project
 * yang sebenarnya.
 *
 * Untuk sementara, kita mencegah browser
 * berpindah ke bagian paling atas halaman
 * ketika link diklik.
 */

document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    });