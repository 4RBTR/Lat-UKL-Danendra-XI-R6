"use client";

import Image from "next/image";

const ProfilePage = () => {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-md">

            {/* Title */}
            <h2 className="text-4xl font-extrabold text-teal-600 mb-3">
                Profil Pribadi
            </h2>
            <p className="text-gray-600 mb-10 max-w-2xl">
                Halaman yang berisi informasi lengkap tentang identitas saya, perjalanan hidup, minat, hobi, serta tujuan masa depan.
            </p>

            {/* Profile Card */}
            <div className="bg-teal-50 border border-teal-200 p-8 rounded-2xl shadow-sm mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                    {/* Profile Image */}
                    <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                        <Image
                            src="/danendra.jpg"
                            alt="Foto Profil Danendra Bagas Himawan"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Profile Info */}
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">
                            Danendra Bagas Himawan
                        </h3>
                        <p className="text-gray-500 italic mb-4">
                            Pelajar • Calon Programmer • Kreator Digital
                        </p>

                        <div className="space-y-2 text-gray-700 text-base">
                            <p><span className="font-semibold text-teal-600">📍 Tempat Lahir:</span> Malang, Indonesia</p>
                            <p><span className="font-semibold text-teal-600">🎂 Tanggal Lahir:</span> 8 Januari 2009</p>
                            <p><span className="font-semibold text-teal-600">📚 Status:</span> Pelajar SMK Telkom Malang (RPL)</p>
                            <p><span className="font-semibold text-teal-600">💡 Tujuan Hidup:</span> Mengembangkan diri dalam dunia teknologi & pemrograman modern.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Me */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-teal-600 mb-3">Tentang Saya</h3>
                <p className="text-gray-700 leading-relaxed">
                    Saya lahir di Malang pada <strong>8 Januari 2009</strong>. Sejak kecil, saya memiliki ketertarikan yang kuat terhadap teknologi,
                    terutama pemrograman dan pengembangan perangkat lunak. Saya senang mencoba hal baru, bereksperimen dengan kode,
                    dan membangun proyek yang bermanfaat.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                    Saat ini saya menempuh pendidikan di bidang <strong>Rekayasa Perangkat Lunak (RPL)</strong>
                    yang terus mendorong saya untuk berkembang dalam frontend, backend, serta desain UI/UX.
                    Saya percaya teknologi adalah jalan menuju masa depan yang penuh inovasi dan peluang.
                </p>
            </section>

            {/* Hobbies */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-teal-600 mb-3">Hobi & Minat</h3>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                    <li>Mengembangkan proyek pemrograman pribadi</li>
                    <li>Mendengarkan musik untuk inspirasi</li>
                    <li>Mendesain UI/UX bergaya modern minimalis</li>
                    <li>Membaca artikel teknologi terbaru</li>
                    <li>Bermain game untuk melatih strategi dan kreativitas</li>
                </ul>
            </section>

            {/* Vision */}
            <section className="">
                <h3 className="text-2xl font-bold text-teal-600 mb-3">Visi & Cita-Cita</h3>
                <p className="text-gray-700 leading-relaxed">
                    Saya bercita-cita menjadi seorang <strong>Software Engineer profesional</strong>
                    yang dapat menciptakan inovasi digital, membangun sistem yang efisien,
                    serta menghadirkan pengalaman pengguna terbaik melalui desain UI/UX modern.
                </p>
            </section>
        </div>
    );
};

export default ProfilePage;
