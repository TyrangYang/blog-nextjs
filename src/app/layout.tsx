import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { authorName, githubLink } from '@/staticParam';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faCircleHalfStroke,
  faHouse,
  faLayerGroup,
  faMagnifyingGlass,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import FooterCCLink from '@/components/footerCCLink';
config.autoAddCss = false;

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'TyrangYangBlog',
  description: 'Tyrang Yang blog',
};

export const dynamic = 'error'; // disable any dynamic function
export const revalidate = false; // stop ISR

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body>
        <header className="flex h-14 items-center justify-between bg-gray-100 px-10 transition-shadow duration-300 hover:shadow-lg">
          <div className="text-border text-2xl font-bold text-black hover:text-cyan-600">
            <Link href={'/'}>TyrangYang_Blog</Link>
          </div>
          <ul className="flex">
            <div className="flex">
              <li className="header-nav flex">
                <Link href={'/categories'}>
                  <FontAwesomeIcon className="mr-1" icon={faLayerGroup} />
                  <span>Categories</span>
                </Link>
              </li>
              <li className="header-nav">
                <Link href={'/posts'}>
                  <FontAwesomeIcon className="mr-1" icon={faBookOpen} />
                  <span>Posts</span>
                </Link>
              </li>
              <li className="header-nav">
                <Link href={'/tags'}>
                  <FontAwesomeIcon className="mr-1" icon={faTags} />
                  <span>Tags</span>
                </Link>
              </li>
              <li className="header-nav">
                <Link href={githubLink} target="_blank" rel="external noopener">
                  <FontAwesomeIcon className="mr-1" icon={faGithub} />
                </Link>
              </li>
              <li className="header-nav">
                <FontAwesomeIcon className="mr-1" icon={faHouse} />
              </li>
            </div>
            <span>|</span>
            <div className="mx-2 flex items-center justify-center">
              <li className="header-nav">
                <FontAwesomeIcon className="mr-1" icon={faMagnifyingGlass} />
              </li>
              <li className="header-nav rotate-225">
                <FontAwesomeIcon className="mr-1" icon={faCircleHalfStroke} />
              </li>
            </div>
          </ul>
        </header>
        {children}
        <footer className="text-sm">
          <p className="flex justify-center whitespace-pre">
            © 2025
            <span> | </span>
            <Link
              href={'/'}
              rel="author"
              className="clickable-hover"
            >{`${authorName}`}</Link>
            <span> | </span>
            <FooterCCLink>
              <Image
                src={
                  'https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.eu.svg'
                }
                alt="Creative Commons License"
                width={70}
                height={25}
              />
            </FooterCCLink>
          </p>
          <p className="text-center whitespace-pre-wrap">
            This content is licensed under a{' '}
            <FooterCCLink>
              Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
              International License
            </FooterCCLink>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
