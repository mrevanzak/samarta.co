import { getAsset, getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About Us',
      href: getPermalink('/about-us'),
    },
    {
      text: 'Services',
      links: [
        {
          text: 'Perencanaan Konstruksi',
          href: getPermalink('/service/perencanaan-konstruksi'),
        },
        {
          text: 'Perencanaan Tata Ruang',
          href: getPermalink('/service/perencanaan-tata-ruang'),
        },
        {
          text: 'Standar Harga dan RKBMD',
          href: getPermalink('/service/standar-harga-dan-rkbmd'),
        },
        {
          text: 'Analisa Dampak Ruang',
          href: getPermalink('/service/analisa-dampak-ruang'),
        },
      ],
    },
    {
      text: 'Projects',
      links: [
        {
          text: 'Perencanaan Konstruksi RS Paru Manguharjo ',
          href: getPermalink('perencanaan-konstruksi-rs-paru-manguharjo', 'project'),
        },
        {
          text: 'Jasa Penyusunan ASB Non Fisik',
          href: getPermalink('jasa-penyusunan-asb-non-fisik', 'project'),
        },
        {
          text: 'Jasa Penyusunan HSPK dan ASB Fisik Konstruksi',
          href: getPermalink('jasa-penyusunan-hspk-dan-asb-fisik-konstruksi', 'project'),
        },
        {
          text: 'Penyusunan HSPK dan ASB Fisik Konstruksi Kabupaten Tulungagung',
          href: getPermalink('penyusunan-hspk-dan-asb-fisik-konstruksi-kabupaten-tulungagung', 'project'),
        },
        {
          text: 'Penyusunan SSH Kabupaten Bondowoso',
          href: getPermalink('penyusunan-ssh-kabupaten-bondowoso', 'project'),
        },
        {
          text: 'Penyusunan ASB Kabupaten Bondowoso',
          href: getPermalink('penyusunan-asb-kabupaten-bondowoso', 'project'),
        },
      ],
    },
    {
      text: 'Contact Us',
      href: getPermalink('/contact-us'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
