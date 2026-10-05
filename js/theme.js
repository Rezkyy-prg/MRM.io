/* =========================================================
   THEME.JS
   Dark mode and light mode functionality
   ========================================================= */


/* =========================================================
   1. SELECT THEME ELEMENTS
   ========================================================= */

const themeToggle = document.querySelector("#themeToggle");

const themeIcon = document.querySelector("#themeIcon");


/* =========================================================
   2. GET SAVED THEME
   ========================================================= */

/*
 * Cek apakah pengguna sebelumnya sudah
 * memilih tema.
 *
 * Jika belum ada pilihan, nilainya null.
 */

const savedTheme =
    localStorage.getItem("theme");


/* =========================================================
   3. GET SYSTEM THEME
   ========================================================= */

/*
 * Jika pengguna belum pernah memilih tema,
 * kita melihat preferensi tema dari sistem
 * perangkatnya.
 */

const systemPrefersDark =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;


/* =========================================================
   4. DETERMINE INITIAL THEME
   ========================================================= */

/*
 * Prioritas:
 *
 * 1. Tema yang disimpan pengguna
 * 2. Tema sistem
 * 3. Light mode sebagai fallback
 */

const initialTheme =
    savedTheme ||
    (systemPrefersDark ? "dark" : "light");


/* =========================================================
   5. APPLY THEME
   ========================================================= */

/*
 * Fungsi untuk menerapkan tema
 * ke seluruh halaman.
 */

function applyTheme(theme) {

    /*
     * Menambahkan data-theme ke <html>.
     *
     * Contoh:
     *
     * <html data-theme="dark">
     */

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    /*
     * Mengubah icon tombol.
     *
     * Dark mode  → ☀
     * Light mode → ☾
     */

    if (themeIcon) {

        themeIcon.textContent =
            theme === "dark"
                ? "☀"
                : "☾";

    }


    /*
     * Mengubah accessibility label
     * agar menjelaskan tindakan yang
     * akan dilakukan tombol berikutnya.
     */

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }

}


/* =========================================================
   6. APPLY INITIAL THEME
   ========================================================= */

applyTheme(initialTheme);


/* =========================================================
   7. THEME TOGGLE
   ========================================================= */

/*
 * Ketika tombol tema diklik,
 * tema akan berganti.
 */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            /*
             * Ambil tema yang sedang aktif.
             */

            const currentTheme =
                document.documentElement
                    .getAttribute("data-theme");


            /*
             * Tentukan tema berikutnya.
             */

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            /*
             * Terapkan tema baru.
             */

            applyTheme(newTheme);


            /*
             * Simpan pilihan pengguna.
             *
             * Jadi ketika website dibuka
             * kembali, tema tersebut tetap digunakan.
             */

            localStorage.setItem(
                "theme",
                newTheme
            );

        }
    );

}


/* =========================================================
   8. LISTEN TO SYSTEM THEME CHANGES
   ========================================================= */

/*
 * Jika pengguna belum pernah memilih tema
 * secara manual, website akan mengikuti
 * perubahan tema sistem.
 *
 * Contoh:
 *
 * Windows berubah dari Light → Dark.
 */

const systemThemeQuery =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemThemeQuery.addEventListener(
    "change",
    (event) => {

        /*
         * Jika pengguna sudah memilih tema
         * secara manual, jangan ubah tema.
         */

        const userSelectedTheme =
            localStorage.getItem("theme");


        if (userSelectedTheme) {
            return;
        }


        /*
         * Jika belum ada pilihan manual,
         * ikuti tema sistem.
         */

        const systemTheme =
            event.matches
                ? "dark"
                : "light";


        applyTheme(systemTheme);

    }
);