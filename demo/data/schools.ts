export interface School {
    id: number;
    name: string;
    location: string;
    image: string;
    mapUrl: string;
    description: string;
    level: string;
    startYear: string; // Tambah: Tahun Masuk
    endYear: string;   // Tambah: Tahun Lulus/Sekarang
}

export const schools: School[] = [
    {
        id: 1,
        name: "TK Aurora Kids",
        location: "Sidoarjo, Jawa Timur",
        image: "/school/aurora.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d267375.4418312266!2d112.42548643281246!3d-7.439405499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e15039ccf641%3A0x9b480398a7322461!2sAurora%20Kids!5e1!3m2!1sid!2sid!4v1762498816065!5m2!1sid!2sid",
        description:
            "TK Aurora Kids adalah tempat pertama saya belajar tentang dunia pendidikan. Di sini saya mulai mengenal huruf, angka, dan pentingnya rasa ingin tahu.",
        level: "Kindergarten",
        startYear: "2013",
        endYear: "2015",
    },
    {
        id: 2,
        name: "SD Anugrah School",
        location: "Sidoarjo, Jawa Timur",
        image: "/school/anugrah.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4177.757647475827!2d112.69774691083128!3d-7.437686073250673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e15bacf4ac49%3A0x6b3ea5d90fc23304!2sKB%20-%20TK%20-%20SD%20-%20SMP%20Anugerah%20School!5e1!3m2!1sid!2sid!4v1762498843046!5m2!1sid!2sid",
        description:
            "Saya bersekolah di SD Anugrah School hanya selama satu semester di kelas 1. Masa itu singkat namun penuh kenangan sebelum saya pindah ke Malang karena ayah saya meninggal dunia.",
        level: "Elementary School",
        startYear: "2015",
        endYear: "2016 (Semester 1)",
    },
    {
        id: 3,
        name: "SD Taman Harapan",
        location: "Malang, Jawa Timur",
        image: "/school/harapan.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534454.3231205367!2d112.36054735250113!3d-7.678915301699901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6283d5a0bfe5f%3A0xa09762e514439b6c!2sSD%20Taman%20Harapan!5e1!3m2!1sid!2sid!4v1762498861546!5m2!1sid!2sid",
        description:
            "Sekolah dasar utama saya di Malang. Di sini saya banyak belajar hal baru, mulai dari disiplin, tanggung jawab, hingga kerja sama dalam kelompok.",
        level: "Elementary School",
        startYear: "2016",
        endYear: "2021",
    },
    {
        id: 4,
        name: "SMP Shalahuddin",
        location: "Malang, Jawa Timur",
        image: "/school/shalahuddin.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4172.508750444307!2d112.62975331083864!3d-7.970161479413265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6283023f641c7%3A0x88cb996946002cef!2sSMP%20Shalahuddin%20Malang!5e1!3m2!1sid!2sid!4v1762498879580!5m2!1sid!2sid",
        description:
            "Masa SMP saya di Shalahuddin Malang penuh pengalaman penting, terutama dalam pengembangan karakter dan organisasi sekolah.",
        level: "Junior High School",
        startYear: "2021",
        endYear: "2024",
    },
    {
        id: 5,
        name: "SMK Telkom Malang",
        location: "Malang, Jawa Timur",
        image: "/school/telkom.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4172.440457185973!2d112.6564357108387!3d-7.976856679493738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6285c5c1b44e3%3A0xf6c889ac7452dc3a!2sSMK%20Telkom%20Malang!5e1!3m2!1sid!2sid!4v1762498897445!5m2!1sid!2sid",
        description:
            "Sekarang saya bersekolah di SMK Telkom Malang, mengambil jurusan Rekayasa Perangkat Lunak (RPL). Di sini saya semakin fokus belajar dunia teknologi, pemrograman, dan pengembangan sistem.",
        level: "Senior High School",
        startYear: "2024",
        endYear: "Sekarang", // Tahun ini disesuaikan
    },
];