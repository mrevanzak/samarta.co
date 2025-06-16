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
      images: [
        { src: '/images/image 6.png', alt: 'Perencanaan Konstruksi' },
        { src: '/images/jeriden-villegas-niSnhfMjiMI-unsplash.png', alt: 'Perencanaan Konstruksi 2' },
        { src: '/images/glenov-brankovic-DWp5nUqTn6E-unsplash.png', alt: 'Perencanaan Konstruksi 3' },
      ],
      permalink: 'perencanaan-konstruksi',
      contents: [
        {
          heading: 'Design',
          type: 'list',
          point: [
            'Commercial Buildings',
            'Perencanaan Desain Road and Bridge',
            'Port, Airport, Industry Facility',
            'Soil Improvement',
          ],
        },
        {
          heading: 'Ruang Lingkup',
          type: 'badge',
          point: [
            'Masterplan Design',
            'Perencanaan Desain Arsitektural dan Perancangan Struktur',
            'Perhitungan Rencana Anggaran Biaya dan Biaya Komersil',
            'Detail Engineering Design (DED) dan Spesifikasi Teknis',
            'Manajemen Proyek Konstruksi',
            'Structure Assesment',
          ],
        },
      ],
    },
    {
      title: 'Perencanaan Tata Ruang',
      images: [
        { src: '/images/image 5.png', alt: 'Perencanaan Tata Ruang' },
        { src: '/images/tolu-olubode-PlBsJ5MybGc-unsplash 1.png', alt: 'Perencanaan Tata Ruang 2' },
        { src: '/images/yuvraj-singh-vpy06JksHw8-unsplash 2.png', alt: 'Perencanaan Tata Ruang 3' },
      ],
      permalink: 'perencanaan-tata-ruang',
      contents: [
        {
          heading: 'Ruang Lingkup',
          type: 'badge',
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
      images: [
        { src: '/images/anthony-tuil-5d2JJyEYKQ8-unsplash 1.png', alt: 'Standar Harga dan RKBMD' },
        { src: '/images/ryan-ancill-nGsVMkRatgM-unsplash 1.png', alt: 'Standar Harga dan RKBMD 2' },
        { src: '/images/aaron-lefler-ySZdYkPGEbs-unsplash 2.png', alt: 'Standar Harga dan RKBMD 3' },
      ],
      contents: [
        {
          heading: 'Design',
          type: 'list',
          point: ['SSH & SBU', 'HSPPK', 'ASB Fisik dan Non Fisik', 'SKBMD'],
        },
        {
          heading: 'Ruang Lingkup',
          type: 'badge',
          point: [
            'Penyusunan Manajemen Risiko (SOP)',
            'Penyusunan standarisasi komponen dan standarisasi harga',
            'Simulasi implementasi standar harga fisik konstruksi',
            'Penyusunan Rencana Kebutuhan Barang Milik Daerah',
            'Penyusunan kebijakan Peraturan Daerah mengenai Standar Harga Satuan dan Standar Kebutuhan Barang Milik Daerah',
          ],
        },
      ],
    },
    {
      title: 'Analisa Dampak Ruang',
      images: [
        { src: '/images/thisisengineering-zIL_CiC-bT0-unsplash 1.png', alt: 'Analisa Dampak Ruang' },
        { src: '/images/chuttersnap-NMrUtSA7094-unsplash 2.png', alt: 'Analisa Dampak Ruang 2' },
        { src: '/images/miguel-picq-gpX-8rCByMw-unsplash 2.png', alt: 'Analisa Damapak Ruang 3' },
      ],
      permalink: 'analisa-dampak-ruang',
      contents: [
        {
          heading: 'Ruang Lingkup',
          type: 'badge',
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
