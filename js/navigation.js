/* =========================================================
   NAVIGATION.JS
   Navigation, mobile menu, and active section handling
   ========================================================= */


/* =========================================================
   1. SELECT NAVIGATION ELEMENTS
   ========================================================= */

const menuToggle = document.querySelector("#menuToggle");

const navWrapper = document.querySelector("#navWrapper");

const navLinks = document.querySelectorAll(".nav-link");

const siteHeader = document.querySelector("#siteHeader");


/* =========================================================
   2. CLOSE MOBILE MENU
   ========================================================= */

/*
 * Fungsi ini digunakan untuk menutup
 * navigation menu pada perangkat mobile.
 */

function closeMenu() {

    navWrapper.classList.remove("is-open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   3. MOBILE MENU TOGGLE
   ========================================================= */

/*
 * Ketika tombol hamburger diklik,
 * menu akan dibuka atau ditutup.
 */

menuToggle.addEventListener(
    "click",
    () => {

        /*
         * Toggle class "is-open".
         *
         * Jika belum ada → ditambahkan.
         * Jika sudah ada → dihapus.
         */

        const isOpen =
            navWrapper.classList.toggle("is-open");


        /*
         * Mencegah halaman ikut scrolling
         * ketika mobile menu sedang terbuka.
         */

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );


        /*
         * Memperbarui atribut accessibility.
         */

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


/* =========================================================
   4. CLOSE MENU WHEN LINK IS CLICKED
   ========================================================= */

/*
 * Ketika salah satu navigation link diklik,
 * mobile menu otomatis ditutup.
 */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* =========================================================
   5. HEADER SCROLL EFFECT
   ========================================================= */

/*
 * Ketika halaman di-scroll lebih dari 20px,
 * class "scrolled" ditambahkan ke header.
 *
 * Class tersebut kemudian diproses oleh CSS.
 */

window.addEventListener(
    "scroll",
    () => {

        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }
);


/* =========================================================
   6. SELECT PAGE SECTIONS
   ========================================================= */

/*
 * Mengambil semua section utama yang
 * memiliki ID.
 *
 * Contoh:
 *
 * <section id="home">
 * <section id="about">
 * <section id="projects">
 */

const sections = document.querySelectorAll(
    "main section[id]"
);


/* =========================================================
   7. ACTIVE NAVIGATION OBSERVER
   ========================================================= */

/*
 * IntersectionObserver digunakan untuk
 * mengetahui section mana yang sedang
 * berada di area utama layar.
 */

const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                /*
                 * Jika section belum terlihat,
                 * tidak perlu mengubah navigation.
                 */

                if (!entry.isIntersecting) {
                    return;
                }


                /*
                 * Periksa setiap navigation link.
                 */

                navLinks.forEach((link) => {

                    /*
                     * Ambil tujuan link.
                     *
                     * Contoh:
                     *
                     * href="#about"
                     *
                     * akan menghasilkan:
                     *
                     * #about
                     */

                    const linkTarget =
                        link.getAttribute("href");


                    /*
                     * Cocokkan dengan ID section.
                     */

                    const sectionTarget =
                        `#${entry.target.id}`;


                    /*
                     * Tambahkan class active
                     * hanya pada link yang sesuai.
                     */

                    link.classList.toggle(
                        "active",
                        linkTarget === sectionTarget
                    );

                });

            });

        },

        {
            /*
             * Area pengamatan dibuat lebih
             * fokus pada bagian tengah layar.
             */

            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


/* =========================================================
   8. OBSERVE ALL SECTIONS
   ========================================================= */

sections.forEach((section) => {

    sectionObserver.observe(section);

});