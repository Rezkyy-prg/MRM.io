/* =========================================================
   ANIMATIONS.JS
   Scroll reveal animations and scroll progress
   ========================================================= */


/* =========================================================
   1. SELECT REVEAL ELEMENTS
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");


/* =========================================================
   2. CREATE INTERSECTION OBSERVER
   ========================================================= */

/*
 * IntersectionObserver digunakan untuk mendeteksi
 * kapan sebuah elemen masuk ke area layar.
 *
 * Jadi kita tidak perlu terus-menerus mengecek posisi
 * setiap elemen dengan scroll event. Browser sudah
 * punya mekanisme yang lebih efisien untuk ini.
 */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            /*
             * Jika elemen belum masuk viewport,
             * tidak perlu melakukan apa-apa.
             */

            if (!entry.isIntersecting) {
                return;
            }


            /*
             * Tambahkan class "is-visible".
             *
             * Class ini kemudian diproses oleh
             * sections.css.
             */

            entry.target.classList.add("is-visible");


            /*
             * Setelah animasi dipicu satu kali,
             * observer tidak perlu mengamati elemen
             * tersebut lagi.
             */

            observer.unobserve(entry.target);

        });

    },

    {
        /*
         * Animasi mulai ketika sekitar 12%
         * elemen sudah terlihat.
         */

        threshold: 0.12
    }
);


/* =========================================================
   3. OBSERVE ALL REVEAL ELEMENTS
   ========================================================= */

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   4. SCROLL PROGRESS
   ========================================================= */

/*
 * Mengambil elemen progress bar dari HTML.
 */

const scrollProgress = document.querySelector(
    "#scrollProgress"
);


/* =========================================================
   5. UPDATE SCROLL PROGRESS
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        /*
         * Total halaman yang bisa di-scroll.
         */

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        /*
         * Menghitung persentase posisi scroll.
         *
         * Contoh:
         *
         * scrollY = 500
         * scrollable = 2000
         *
         * progress = 25%
         */

        const progress =
            scrollable > 0
                ? (window.scrollY / scrollable) * 100
                : 0;

        /*
         * Mengubah lebar progress bar.
         */

        scrollProgress.style.width =
            `${progress}%`;

    }
);