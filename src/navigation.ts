import { getAsset, getHomePermalink, getPermalink, getProjectPermalink } from './utils/permalinks';
import { findLatestPosts } from './utils/project';

export const generateHeaderData = async () => ({
  links: [
    {
      text: 'Home',
      href: getHomePermalink(),
    },
    {
      text: 'About Us',
      href: getPermalink('/about-us'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
      links: [
        {
          text: 'Perencanaan Konstruksi',
          href: getPermalink('/services/perencanaan-konstruksi'),
        },
        {
          text: 'Perencanaan Tata Ruang',
          href: getPermalink('/services/perencanaan-tata-ruang'),
        },
        {
          text: 'Standar Harga dan RKBMD',
          href: getPermalink('/services/standar-harga-dan-rkbmd'),
        },
        {
          text: 'Analisa Dampak Ruang',
          href: getPermalink('/services/analisa-dampak-ruang'),
        },
      ],
    },
    {
      text: 'Projects',
      href: getProjectPermalink(),
      links: (await findLatestPosts({ count: 5 })).map((post) => ({
        text: post.title,
        href: getPermalink(post.permalink, 'project'),
      })),
    },
    {
      text: 'Contact Us',
      href: getPermalink('/contact-us'),
    },
  ],
});

export const footerData = {
  links: [
    {
      text: 'Services',
      href: '#',
    },
    {
      text: 'Projects',
      href: '#',
    },
    {
      text: 'Contact Us',
      href: '#',
    },
    {
      text: 'Get Company Profile',
      href: getAsset('/company-profile.pdf'),
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram-filled', href: 'https://www.instagram.com/samarta_id' },
    { ariaLabel: 'Linkedin', icon: 'tabler:brand-linkedin-filled', href: 'https://www.linkedin.com' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  contacts: [
    {
      icon: 'tabler:map-pin-filled',
      text: 'Kalijudan Regency 10, Surabaya',
    },
    {
      icon: 'tabler:phone-filled',
      text: '+62 813-3067-6881',
    },
    {
      icon: 'tabler:mail-filled',
      text: 'contact@samarta.co',
      href: 'mailto:contact@samarta.co',
    },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
