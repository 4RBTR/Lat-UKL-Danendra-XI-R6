export interface School {
    id: number;
    name: string;
    location: string;
    image: string;
    mapUrl: string;
    description: string;
    level: string;
    startYear: string;
    endYear: string;
    
    // Field tambahan untuk tampilan baru
    logo: string;       // Wajib ada (bisa pakai gambar yang sama dengan image jika tidak ada logo khusus)
    years: string;      // Format gabungan (contoh: "2013 - 2015")
    major?: string;     // Opsional (Hanya untuk SMK/Kuliah)
}

export const schools: School[] = [
    {
        id: 1,
        name: "TK Aurora Kids",
        location: "Sidoarjo, Jawa Timur",
        image: "/school/aurora.jpg",
        logo: "/school/aurora.jpg", // Menggunakan gambar yang sama sementara
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.823716927372!2d112.73478!3d-7.3736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjInMjUuMCJTIDExMsKwNDQnMTUuMiJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        description:
            "TK Aurora Kids adalah tempat pertama saya belajar tentang dunia pendidikan. Di sini saya mulai mengenal huruf, angka, dan pentingnya rasa ingin tahu serta bersosialisasi dengan teman sebaya.",
        level: "Kindergarten",
        startYear: "2013",
        endYear: "2015",
        years: "2013 - 2015"
    },
    {
        id: 2,
        name: "SD Anugrah School",
        location: "Sidoarjo, Jawa Timur",
        image: "/school/anugrah.jpg",
        logo: "/school/anugrah.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.289!2d112.7!3d-7.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjQnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        description:
            "Saya bersekolah di SD Anugrah School hanya selama satu semester di kelas 1. Masa itu singkat namun penuh kenangan sebelum saya pindah ke Malang karena ayah saya meninggal dunia.",
        level: "Elementary School",
        startYear: "2015",
        endYear: "2016",
        years: "2015 - 2016"
    },
    {
        id: 3,
        name: "SD Taman Harapan",
        location: "Malang, Jawa Timur",
        image: "/school/harapan.jpg",
        logo: "/school/harapan.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.123!2d112.6!3d-7.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTQnMDAuMCJTIDExMsKwMzYnMDAuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        description:
            "Sekolah dasar utama saya di Malang. Di sini saya banyak belajar hal baru, mulai dari disiplin, tanggung jawab, hingga kerja sama dalam kelompok melalui berbagai kegiatan ekstrakurikuler.",
        level: "Elementary School",
        startYear: "2016",
        endYear: "2021",
        years: "2016 - 2021"
    },
    {
        id: 4,
        name: "SMP Shalahuddin",
        location: "Malang, Jawa Timur",
        image: "/school/shalahuddin.jpg",
        logo: "/school/shalahuddin.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.210!2d112.63!3d-7.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd628220d2c7b33%3A0x4033d937074060!2sSMP%20Shalahuddin%20Malang!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        description:
            "Masa SMP saya di Shalahuddin Malang penuh pengalaman penting, terutama dalam pengembangan karakter, kepemimpinan, dan organisasi sekolah. Saya mulai tertarik dengan teknologi di masa ini.",
        level: "Junior High School",
        startYear: "2021",
        endYear: "2024",
        years: "2021 - 2024"
    },
    {
        id: 5,
        name: "SMK Telkom Malang",
        location: "Malang, Jawa Timur",
        image: "/school/telkom.jpg",
        logo: "/school/telkom.jpg",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.625817374372!2d112.6543373147757!3d-7.976569994253367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6285c5c1b44e3%3A0xf6c889bc7452fab!2sSMK%20Telkom%20Malang!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        description:
            "Sekarang saya bersekolah di SMK Telkom Malang (Moklet), sekolah IT terbaik di Indonesia. Di sini saya mendalami dunia pemrograman, pengembangan perangkat lunak, dan teknologi modern.",
        level: "Senior High School",
        startYear: "2024",
        endYear: "Sekarang",
        years: "2024 - Sekarang",
        major: "Rekayasa Perangkat Lunak (RPL)"
    },
];