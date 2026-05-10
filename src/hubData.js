import { SiGithub, SiInstagram, SiTelegram, SiYoutube } from 'react-icons/si'

/** Edit all hub page copy and social links here. Lesson list stays in `./lessons.js` (used by Vite). */
export const hub = {
  title: 'three.js course',
  subtitle:
    'Open a lesson in the browser or jump to the matching YouTube video for each lesson.',
  socialNavAriaLabel: 'Social links',
  socialLinks: [
    {
      href: 'https://www.instagram.com/not.toso',
      label: 'Instagram',
      Icon: SiInstagram,
    },
    {
      href: 'https://t.me/webtoso',
      label: 'Telegram channel',
      Icon: SiTelegram,
    },
    {
      href: 'https://www.youtube.com/@webtoso',
      label: 'YouTube channel',
      Icon: SiYoutube,
    },
    {
      href: 'https://github.com/Toosoo/threejs-course',
      label: 'GitHub repository',
      Icon: SiGithub,
    },
  ],
  lessonCard: {
    lessonButton: 'Lesson',
    youtubeButton: 'YouTube',
    youtubeDisabledTitle: 'Set youtubeUrl in src/lessons.js',
  },
}
