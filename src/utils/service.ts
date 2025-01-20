import type { Service } from '@/types';

export const getStaticPathsServicePost = async () => {
  return getServices().flatMap((service) => {
    return {
      params: {
        slug: service.permalink,
      },
      props: { service },
    };
  });
};

export function getServices(): Service[] {
  return [
    {
      title: 'Perencanaan Konstruksi',
      images: [{ src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero-2.png', alt: 'Service Image 1' }, { src: 'hero-3.png', alt: 'Service Image 1' }],
      permalink: 'perencanaan-konstruksi',
      contents: [
        {
          heading: 'Ruang Lingkup',
          type: 'list',
          point: [
            'Masterplan Design',
            'Perencanaan Desain Arsitektural dan Perancangan Struktur',
            'Perhitungan Rencana Anggaran Biaya dan Biaya Komersil',
            'Detail Engineering Design (DED) dan Spesifikasi Teknis',
            'Manajemen Proyek Konstruksi',
            'Structure Assesment',
          ],
        },
        {
          heading: 'Design',
          type: 'label',
          point: [
            'Commercial Buildings',
            'Perencanaan Desain Road and Bridge',
            'Port, Airport, Industry Facility',
            'Soil Improvement',
          ],
        },
      ],
    },
    {
      title: 'Perencanaan Tata Ruang',
      images: [{ src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero.png', alt: 'Service Image 1' }],

      permalink: 'perencanaan-tata-ruang',
      contents: [
        {
          heading: 'Ruang Lingkup',
          type: 'list',
          point: [
            'Penyusunan Rencana Umum Tata Ruang yaitu Rencana Tata Ruang Wilayah (RTRW)',
            'Penyusunan Rencana Rinci Tata Ruang meliputi Rencana Detail Tata Ruang (RDTR), Rencana Tata Bangungan dan Lingkungan (RTBL), Rencana Tata Ruang Pulau/Kepulauan, Rencana Tata Ruang Kawasan Strategis (RTRKS), dan Rencana Rinci lain',
            'Penyusunan dokumen perencanaan periodik meliputi Rencana Pembangunan Jangka Panjang (RPJP) Pembangunan Jangka Menengah (RPJM)',
          ],
        },
      ],
    },
    {
      title: 'Standar Harga dan RKBMD',
      permalink: 'standar-harga-dan-rkbmd',
      images: [{ src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero.png', alt: 'Service Image 1' }],
      contents: [
        {
          heading: 'Ruang Lingkup',
          type: 'list',
          point: [
            'Penyusunan Manajemen Risiko (SOP)',
            'Penyusunan standarisasi komponen dan standarisasi harga',
            'Simulasi implementasi standar harga fisik konstruksi',
            'Penyusunan Rencana Kebutuhan Barang Milik Daerah',
            'Penyusunan kebijakan Peraturan Daerah mengenai Standar Harga Satuan dan Standar Kebutuhan Barang Milik Daerah',
          ],
        },
        {
          heading: 'Design',
          type: 'label',
          point: ['SSH & SBU', 'HSPPK', 'ASB Fisik dan Non Fisik', 'SKBMD'],
        },
      ],
    },
    {
      title: 'Analisa Dampak Ruang',
      images: [{ src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero.png', alt: 'Service Image 1' }, { src: 'hero.png', alt: 'Service Image 1' }],
      permalink: 'analisa-dampak-ruang',
      contents: [
        {
          heading: 'Ruang Lingkup',
          type: 'list',
          point: [
            'Penyusunan Kajian Lingkungan Hidup Strategis (KLHS)',
            'Penyusunan Dokumen Analisis Dampak Lingkungan (AMDAL)',
            'Penyunan Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan (UKL/UPL)',
            'Surat Pernyataan Kesanggupan Pengelolaan dan Pemantauan Lingkungan Hidup (SPPL)',
          ],
        },
      ],
    },
  ];
}
